import TopicTemplate from "@/components/templates/topic-template";
import { pageSize } from "@/constants/app";
import { getTopics, getCategories, getPosts, getCategory, getAuthor } from "@/lib/newt";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { categoryId, pageId } = await params

    const category = await getCategory({
        query: {
            slug: categoryId
        }
    })

    const parentMeta = await parent;

    return {
        title: category!.name,
        description: category!.description,
        openGraph: {
            ...parentMeta.openGraph,
            url: `${process.env.SITE_URL}/${category!.topic.slug}/${category!.slug}/page/${pageId}`,
            title: category!.name,
            description: category!.description,
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
            const { items: categories } = await getCategories({ query: { topic: topic._id } });

            const categoryPaths = await Promise.all(
                categories.map(async (category) => {
                    const { total } = await getPosts({ query: { category: category._id } });
                    const totalPages = Math.max(1, Math.ceil(total / pageSize));
                    return Array.from({ length: totalPages }, (_, i) => ({
                        topicId: topic.slug,
                        categoryId: category.slug,
                        pageId: String(i + 1),
                    }));
                })
            );

            return categoryPaths.flat();
        })
    );

    return paths.flat();
}

type Props = {
    params: Promise<{ topicId: string, categoryId: string, pageId: string }>
}

export default async function Page({ params }: Props) {

    const { categoryId, pageId } = await params
    const pageNumber = Number(pageId)

    const category = await getCategory({
        query: {
            slug: categoryId
        }
    })

    const { items: articles, total } = await getPosts({
        query: {
            category: category!._id,
            limit: pageSize,
            skip: (pageNumber - 1) * pageSize
        }
    })

    const { items: categories } = await getCategories()
    const author = await getAuthor({ query: { admin: true } })

    if (!author) {
        return <p>著者が存在しません。</p>
    }


    const breadthumbList = [
        { name: "ホーム", slug: "" },
        { name: category!.topic.name, slug: `${category!.topic.slug}/page/1` }
    ]

    return (
        <TopicTemplate
            categoryTitle="カテゴリー"
            authorDesc={author.description}
            segment={`/${categoryId}/page/`}
            breadthumbList={breadthumbList}
            authorName={author.fullName}
            authorSrc={author.profileImage.src}
            currentPage={Number(pageId)}
            totalPages={Math.ceil(total / pageSize)}
            categories={categories}
            topicDesc={category!.description}
            topicTitle={category!.name}
            articles={articles}
        />
    );
}
