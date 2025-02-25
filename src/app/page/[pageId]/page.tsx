import TopTemplate from "@/components/templates/top-template";
import { pageSize } from "@/constants/app";
import { getAuthor, getPosts, getTopics } from "@/lib/newt";

type Props = {
    params: Promise<{ pageId: string }>
}

export async function generateStaticParams() {
    const { total } = await getPosts()
    const totalPages = Math.ceil(total / pageSize)

    return Array.from({ length: totalPages }, (_, i) => ({
        pageId: String(i + 1)
    }))
}

export default async function Page({ params }: Props) {

    const { pageId } = await params

    const pageNumber = Number(pageId);
    const { items: articles, total } = await getPosts({
        query: {
            limit: pageSize,
            skip: (pageNumber - 1) * pageSize,
        },
    })
    const { items: topics } = await getTopics()
    const author = await getAuthor({ query: { admin: true } })

    if (!author) {
        return <p>著者が存在しません。</p>
    }

    return (
        <TopTemplate
            adminDesc={author.description}
            currentPage={pageNumber}
            totalPage={Math.ceil(total / pageSize)}
            topics={topics}
            articles={articles}
            adminName={author.fullName}
            adminImage={author.profileImage.src}
        />
    );
}
