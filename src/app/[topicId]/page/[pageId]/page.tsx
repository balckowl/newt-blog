import TopicTemplate from "@/components/templates/topic-template";
import { pageSize } from "@/constants/app";
import { getAuthor, getCategories, getPosts, getTopic, getTopics } from "@/lib/newt";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ topicId: string, pageId: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { topicId, pageId } = await params
  const topic = await getTopic({
    query: { slug: topicId }
  })

  const parentMeta = await parent;

  return {
    title: topic!.name,
    description: topic!.description,
    openGraph: {
      ...parentMeta.openGraph,
      url: `${process.env.SITE_URL}/${topic!.name}/page/${pageId}`,
      title: topic!.name,
      description: topic!.description,
      images: [
        `/ogp/home-ogp-normal.png`,
        ...parentMeta.openGraph?.images || []
      ],
      type: "article",
    }
  };
}

export async function generateStaticParams() {
  const { items: topics } = await getTopics();

  const paths = await Promise.all(
    topics.map(async (topic) => {
      const topicDetails = await getTopic({ query: { slug: topic.slug } });

      if (!topicDetails) return [];

      const { items: categories } = await getCategories({
        query: { topic: topicDetails._id },
      });

      const categoryIds = categories.map((category) => category._id);
      const { total } = await getPosts({
        query: { category: { in: categoryIds } },
      });

      const totalPages = Math.max(1, Math.ceil(total / pageSize));

      return Array.from({ length: totalPages }, (_, i) => ({
        topicId: topic.slug,
        pageId: String(i + 1),
      }));
    })
  );

  return paths.flat();
}

export default async function Page({ params }: Props) {

  const { topicId, pageId } = await params

  const pageNumber = Number(pageId)

  const topic = await getTopic({
    query: { slug: topicId }
  })

  const { items: categories } = await getCategories({
    query: {
      topic: topic!._id
    }
  })

  const categoryIds = categories.map((category) => category._id);

  const { items: articles, total } = categoryIds.length > 0
    ? await getPosts({
      query: {
        category: { in: categoryIds },
        depth: 1,
        limit: pageSize,
        skip: (pageNumber - 1) * pageSize,
      },
    })
    : { items: [], total: 0 };

  const author = await getAuthor({ query: { admin: true } })

  const breadthumbList = [
    { name: "ホーム", slug: "" },
  ]

  if (!author) {
    return <p>著者が存在しません。</p>
  }

  return (
    <TopicTemplate
      categoryTitle="カテゴリー"
      authorDesc={author.description}
      segment={`/${topicId}/page/`}
      breadthumbList={breadthumbList}
      authorName={author.fullName}
      authorSrc={author.profileImage.src}
      currentPage={Number(pageId)}
      totalPages={Math.ceil(total / pageSize)}
      categories={categories}
      topicDesc={topic!.description}
      topicTitle={topic!.name}
      articles={articles}
    />
  );
}
