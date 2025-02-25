import { getAuthor, getPosts, getTopics } from '@/lib/newt'
import TopTemplate from '@/components/templates/top-template';
import { pageSize } from '@/constants/app';

export default async function Home() {

  const pageNumber = 1;

  const { items: articles, total } = await getPosts({
    query: {
      limit: pageSize,
      skip: (pageNumber - 1) * pageSize,
    },
  })

  const { items: topics } = await getTopics()
  const author = await getAuthor({ query: { admin: true } })

  return (
    <TopTemplate
      adminDesc={author!.description}
      currentPage={pageNumber}
      totalPage={Math.ceil(total / pageSize)}
      topics={topics}
      articles={articles}
      adminName={author!.fullName}
      adminImage={author!.profileImage.src}
    />
  )
}
