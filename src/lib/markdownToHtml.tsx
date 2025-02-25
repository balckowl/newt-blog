import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from 'unist-util-visit';
import remarkDirective from "remark-directive";
import { getAuthors } from "./newt";
import ogs from "open-graph-scraper";
import { Author } from "@/types/article";

export function remarkMarkPlugin() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, "text", (node, index, parent) => {
      if (!parent || !node.value.includes("::mark::")) return;

      const regex = /::mark::(.*?)::mark::/g;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parts: any[] = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(node.value)) !== null) {
        if (match.index > lastIndex) {
          parts.push({
            type: "text",
            value: node.value.slice(lastIndex, match.index),
          });
        }

        parts.push({
          type: "element",
          tagName: "span",
          properties: { className: ["mark"] },
          children: [{ type: "text", value: match[1] }],
        });

        lastIndex = regex.lastIndex;
      }

      if (lastIndex < node.value.length) {
        parts.push({
          type: "text",
          value: node.value.slice(lastIndex),
        });
      }

      // `parent.children` を直接編集
      if (parts.length > 0) {
        parent.children.splice(index, 1, ...parts);
      }
    });
  };
}

function ogpLinkCardPlugin() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (tree: any) => {
    const promises: Promise<void>[] = [];

    visit(tree, 'element', (node, index, parent) => {
      if (
        node.tagName === 'a' && // リンクであることを確認
        node.properties?.href && // href属性があることを確認
        parent &&
        parent.tagName === 'p' && // 親が<p>タグ
        parent.children.length === 1 && // 子要素が1つだけ
        parent.children[0] === node // その子要素が現在のリンク
      ) {
        const url = node.properties.href as string;

        // 非同期処理のPromiseを作成
        const promise = (async () => {
          try {

            const { result } = await ogs({ url });

            const title = result.ogTitle || url;
            const imageUrl = result.ogImage && result.ogImage[0]?.url || '';
            const description = result.ogDescription || '';
            const domain = new URL(url).origin;

            // リンクカードノードを作成
            const linkCardNode = {
              type: 'element',
              tagName: 'div',
              properties: { className: ['link-card'] },
              children: [
                {
                  type: 'element',
                  tagName: 'a',
                  properties: {
                    href: url,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: ['link-card-anchor'],
                  },
                  children: [
                    {
                      type: 'element',
                      tagName: 'div',
                      properties: { className: ['link-card-content'] },
                      children: [
                        imageUrl
                          ? {
                            type: 'element',
                            tagName: 'img',
                            properties: {
                              src: imageUrl,
                              alt: title,
                              className: ['link-card-image'],
                            },
                          }
                          : null,
                        {
                          type: 'element',
                          tagName: 'div',
                          properties: { className: ['link-card-text'] },
                          children: [
                            {
                              type: 'element',
                              tagName: 'div',
                              properties: { className: ['link-card-text-wrapper'] }, // title と description をまとめる <div>
                              children: [
                                {
                                  type: 'element',
                                  tagName: 'p', // タイトルを <h3> でラップ
                                  properties: { className: ['link-card-title'] },
                                  children: [
                                    { type: 'text', value: title },
                                  ],
                                },
                                description
                                  ? {
                                    type: 'element',
                                    tagName: 'p', // 説明を <p> でラップ
                                    properties: {
                                      className: ['link-card-description'],
                                    },
                                    children: [
                                      { type: 'text', value: description },
                                    ],
                                  }
                                  : null,
                              ].filter(Boolean),
                            },
                            {
                              type: 'element',
                              tagName: 'p',
                              properties: {
                                className: ['link-card-link'],
                              },
                              children: [
                                { type: 'text', value: domain },
                              ],
                            },
                          ].filter(Boolean),
                        },
                      ].filter(Boolean),
                    },
                  ],
                },
              ],
            };

            // 親ノード全体をリンクカードノードに置き換え
            parent.tagName = 'div';
            parent.properties = { className: ['link-card-wrapper'] };
            parent.children = [linkCardNode];
          } catch (error) {
            console.error(`Failed to fetch OGP for ${url}:`, error);
          }
        })();

        promises.push(promise);
      }
    });

    // すべての非同期処理が完了するのを待つ
    await Promise.all(promises);
  };
}

function customDetails() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective' && node.name === 'details') {
        const data = node.data || (node.data = {});

        // details タグを設定
        data.hName = 'details';
        data.hProperties = {
          className: 'custom-details',
        };

        // 最初の子ノードを title として扱う
        const [titleNode, ...contentNodes] = node.children;

        if (titleNode && titleNode.type === 'paragraph') {
          // summary タグを生成
          node.children = [
            {
              type: 'element',
              tagName: 'summary',
              data: { hName: 'summary' }, // タグ名を明示的に設定
              children: titleNode.children,
            },
            {
              type: 'element',
              tagName: 'div',
              data: { hName: 'div', hProperties: { className: 'custom-content' } }, // タグ名を明示的に設定
              properties: { className: 'custom-content' }, // クラスを追加
              children: contentNodes, // 残りの内容を div でラップ
            },
          ];
        } else {
          // タイトルがない場合、デフォルトの summary タグと div でラップ
          node.children = [
            {
              type: 'element',
              tagName: 'summary',
              data: { hName: 'summary' },
              children: [{ type: 'text', value: 'Details' }],
            },
            {
              type: 'element',
              tagName: 'div',
              data: { hName: 'div' },
              properties: { className: 'custom-content' }, // クラスを追加
              children: node.children, // 全体を div でラップ
            },
          ];
        }
      }
    });
  };
}

export function customSpeechBubble(authors: Author[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective' && node.name === 'sbl' || node.name === 'sbr') {
        const data = node.data || (node.data = {});

        data.hName = 'div';

        if (node.name === 'sbl') {
          data.hProperties = {
            className: 'speech-bubble-l',
          };
        } else {
          data.hProperties = {
            className: 'speech-bubble-r',
          };
        }

        const iconNode = {
          type: 'element',
          tagName: 'div',
          data: { hName: 'div', hProperties: { className: 'icon' } },
          properties: { className: 'icon' },
          children: [
            {
              type: 'element',
              tagName: 'img',
              data: { hName: 'img', hProperties: { src: '/author.jpg', alt: 'Author' } },
              properties: { src: '/author.jpg', alt: 'Author' },
              children: [],
            },
            {
              type: 'element',
              tagName: 'p',
              data: { hName: 'p', hProperties: { className: "name" } },
              properties: { className: 'name' },
              children: [{ type: 'text', value: 'ゆうた' }],
            },
          ],
        };

        const [nameNode, ...contentNodes] = node.children;

        if (nameNode && nameNode.type === "paragraph") {
          const nameText = nameNode.children[0].value;

          for (let i = 0; i < authors.length; i++) {
            if (nameText === authors[i].slug) {
              iconNode.children[0].data.hProperties.src = authors[i].profileImage.src
              iconNode.children[0].properties.src = authors[i].profileImage.src

              iconNode.children[1].children[0].value = authors[i].fullName
            }
          }
        }

        const bubbleNode = {
          type: 'element',
          tagName: 'div',
          data: { hName: 'div', hProperties: { className: 'bubble' } },
          properties: { className: 'bubble' },
          children: contentNodes,
        };

        node.children = [iconNode, bubbleNode];
      }
    });
  };
}


export async function markdownToHtml(markdown: string): Promise<string> {

  const authors = await getAuthors()

  const file = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(customDetails)
    .use(customSpeechBubble, authors)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: true,
    })
    .use(ogpLinkCardPlugin)
    .use(remarkMarkPlugin)
    .use(rehypeStringify)
    .process(markdown);

  return file.toString();
}
