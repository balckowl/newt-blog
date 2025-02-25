import { Article, Category } from "@/types/article";
import Container from "../container";
import ArticleCard from "../organisms/article-card";
import TopicCard from "../organisms/topic-card";
import Pagination from "../molecules/pagination";
import SidebarAuthor from "../organisms/sidebar-author";
import SidebarCategory from "../organisms/sidebar-category";
import { faAt, faList } from "@fortawesome/free-solid-svg-icons";
import { getTopic } from "@/lib/newt";
import SearchPage from "../organisms/search-form";

type Props = {
  breadthumbList: Item[];
  topicTitle: string;
  topicDesc: string;
  articles: Article[],
  totalPages: number;
  currentPage: number;
  authorName: string;
  authorSrc: string;
  authorDesc: string;
  categories: Category[]
  segment: string;
  categoryTitle: string;
}

type Item = {
  name: string;
  slug: string;
}

export default function TopicTemplate({
  breadthumbList,
  topicTitle,
  topicDesc,
  articles,
  currentPage,
  totalPages,
  authorName,
  authorSrc,
  categories,
  segment,
  authorDesc,
  categoryTitle
}: Props) {
  return (
    <div className="bg-[#D8E2DC] min-h-[calc(100vh-70px)] pt-5">
      <Container>
        <div className='flex lg:flex-row flex-col md:gap-5'>
          <div className='lg:w-[75%] w-full'>
            <TopicCard
              breadthumbList={breadthumbList}
              title={topicTitle}
              desc={topicDesc}
            />
            <div className="grid md:grid-cols-2 gap-3">
              {articles.map(async (article) => {

                const topic = await getTopic({
                  query: {
                    _id: article.category.topic
                  }
                })

                return (
                  <ArticleCard topicSlug={topic!.slug} article={article} key={article._id} />)
              })}
            </div>

            <div className="flex justify-center my-10 lg:mb-[300px]">
              <Pagination
                segment={segment}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>

          </div>
          <div className='lg:w-[300px] flex flex-col w-full gap-4 mb-4'>
            <div className="lg:order-1 order-3">
              <SidebarAuthor
                desc={authorDesc}
                icon={faAt}
                title='サイト管理人'
                name={authorName}
                image={authorSrc}
              />
            </div>
            <div className="lg:order-1 order-2">
              <SearchPage />
            </div>
            <div className="lg:order-2 order-3">
              <SidebarCategory icon={faList} title={categoryTitle} categories={categories} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
