import SidebarAuthor from "@/components/organisms/sidebar-author";
import SidebarShare from "@/components/organisms/sidebar-share";
import { markdownToHtml } from "@/lib/markdownToHtml";
import { getAuthor, getCategories, getPost, getPosts, getRandomArticles, getTopic } from "@/lib/newt";
import { faArrowsRotate, faClock, faNewspaper, faPen, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound } from "next/navigation";
import styles from "./article.module.css";
import TableOfContents from "@/components/organisms/table-of-contents";
import { format } from "date-fns"
import Breadthumb from "@/components/molecules/breadthumb";
import { faBluesky, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import ArticleAuthor from "@/components/organisms/article-author";
import Link from "next/link";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import SnsList from "@/components/organisms/sns-list";

type Props = {
    params: Promise<{ articleId: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { articleId } = await params
    const article = await getPost(
        {
            query: {
                slug: articleId,
                body: {
                    fmt: "text"
                }
            }
        })

    const topic = await getTopic({
        query: {
            _id: article!.category.topic
        }
    })

    const parentMeta = await parent;

    return {
        title: article!.title,
        description: article!.description,
        openGraph: {
            ...parentMeta.openGraph,
            url: `${process.env.SITE_URL}/${topic!.slug}/${article!.category.slug}/`,
            title: article!.title,
            description: article!.description,
            images: [
                article!.coverImage.src,
                ...parentMeta.openGraph?.images || []
            ],
            type: "article",
        }
    };
}

export async function generateStaticParams() {
    const { items: categories } = await getCategories();

    const paths = await Promise.all(
        categories.map(async (category) => {
            const { items: articles } = await getPosts({ query: { category: category._id } });

            return await Promise.all(
                articles.map(async (article) => {
                    const topic = await getTopic({
                        query: {
                            _id: article.category.topic,
                        }
                    });

                    return {
                        topicId: topic!.slug,
                        categoryId: category.slug,
                        articleId: article.slug,
                    };
                })
            );
        })
    );

    return paths.flat();
}


export default async function Page({ params }: Props) {

    const { articleId } = await params
    const article = await getPost(
        {
            query: {
                slug: articleId,
                body: {
                    fmt: "text"
                }
            }
        })

    if (!article) {
        notFound()
    }

    const topic = await getTopic({
        query: {
            _id: article.category.topic
        }
    })

    const html = await markdownToHtml(article.body);

    const items = [
        { name: "ホーム", slug: "" },
        { name: topic!.name, slug: `${topic!.slug}/page/1` },
        { name: article.category.name, slug: `${topic!.slug}/${article.category.slug}/page/1` }
    ]

    const author = await getAuthor({ query: { _id: article.author._id } })
    const createdAt = format(article._sys.createdAt, "yyyy/MM/dd")
    const updatedAt = format(article._sys.updatedAt, "yyyy/MM/dd")

    const { items: relatedArticles } = await getRandomArticles(
        article.category._id, [article._id]
    )

    if (!author) {
        return <p>著者が存在しません。</p>
    }

    return (
        <div className="bg-[#D8E2DC] min-h-[calc(100vh-70px)] md:pt-5 pt-0">
            <div className="max-w-[1080px] mx-auto md:px-3">
                <div className="flex gap-5">
                    <div className="lg:w-[75%] w-full md:mb-20">
                        <div className="bg-white md:pt-7 pt-4 md:px-9 px-3 md:rounded-xl">
                            <div className="mb-[9px]">
                                <Breadthumb items={items} />
                            </div>
                            <h1 data-pagefind-body className="sm:text-[1.8rem] text-[1.4rem] font-bold mb-[25px]">
                                {article.title}
                            </h1>
                            <div className="flex gap-3 justify-end mb-[10px]">
                                <time dateTime={createdAt} className="flex items-center gap-2 text-gray-500 text-[0.9rem] font-bold">
                                    <FontAwesomeIcon icon={faClock} className="size-3 text-gray-500" /> {createdAt}
                                </time>
                                {createdAt !== updatedAt && <time dateTime={updatedAt} className="flex items-center gap-2 text-gray-500 font-bold text-[0.9rem]">
                                    <FontAwesomeIcon icon={faArrowsRotate} className="size-3 text-gray-500" /> {updatedAt}
                                </time>}
                            </div>
                            <Image priority={true} alt={`${article.title}のサムネイル画像が表示されています`} width={1200} height={630} src={article.coverImage.src} className="w-full rounded-md mb-[25px]" />
                            <div dangerouslySetInnerHTML={{ __html: html }} id="content" className={`${styles.post} min-h-[300px]`} />


                            <div className="pt-[50px]">
                                <h2 className="font-semibold py-2 text-[1.3rem] mb-[1rem] border-b justify-center flex gap-2 items-center">
                                    <FontAwesomeIcon icon={faNewspaper} className="size-[20px]" />
                                    関連記事
                                </h2>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                    {relatedArticles.map((article) => (
                                        <Link href={`/${topic!.slug}/${article.category.slug}/${article.slug}`} key={article._id} className="flex bg-white items-center border-b pb-[1rem]">
                                            <Image alt="" width={90} height={90} src={article.coverImage.src} className="size-[90px] object-cover" />
                                            <h3 className="font-semibold text-[0.9rem] px-4 py-2">{article.title}</h3>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-center items-center gap-2 my-[2rem]">
                                <SnsList article={article} topic={topic}/>
                                <p>でシェア</p>
                            </div>

                            <ArticleAuthor
                                image={author.profileImage.src}
                                name={author.fullName}
                                desc={author.description}
                            />
                        </div>
                    </div>

                    <div className="w-[300px] lg:block hidden space-y-4">
                        <SidebarAuthor
                            desc={author.description}
                            image={author.profileImage.src}
                            name={author.fullName}
                            icon={faPen}
                            title='この記事を書いた人'
                        />
                        <div className="sticky top-3 left-0 space-y-4">
                            <SidebarShare article={article} topic={topic} />
                            <TableOfContents />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
