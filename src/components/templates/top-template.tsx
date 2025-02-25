import { faAt, faFire } from "@fortawesome/free-solid-svg-icons";
import Container from "../container";
import Pagination from "../molecules/pagination";
import ArticleCard from "../organisms/article-card";
import SidebarAuthor from "../organisms/sidebar-author";
import { Article, Topic } from "@/types/article";
import SearchPage from "../organisms/search-form";
import { getTopic } from "@/lib/newt";
import SidebarTopic from "../organisms/sidebar-topic";

type Props = {
    topics: Topic[]
    articles: Article[]
    currentPage: number,
    totalPage: number,
    adminName: string,
    adminImage: string,
    adminDesc: string
}

export default function TopTemplate({
    topics,
    articles,
    currentPage,
    totalPage,
    adminName,
    adminImage,
    adminDesc
}: Props) {
    return (
        <div className='bg-[#f0eae0] min-h-[calc(100vh-70px)] pt-5'>
            <Container>
                <div className='flex lg:flex-row flex-col lg:gap-5'>
                    <div className='lg:w-[75%] w-full'>
                        <div className="mb-5">
                            <SearchPage />
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                            {articles.map(async (article) => {

                                const topic = await getTopic({
                                    query: {
                                        _id: article.category.topic
                                    }
                                })

                                return (
                                    <ArticleCard article={article} topicSlug={topic!.slug} key={article._id} />
                                )
                            })}
                        </div>

                        <div className='flex justify-center my-10 lg:mb-[300px]'>
                            <Pagination
                                segment={"/page"}
                                currentPage={currentPage}
                                totalPages={totalPage}
                            />
                        </div>
                    </div>

                    <div className='lg:w-[300px] flex flex-col w-full gap-4 mb-4'>
                        <div className="lg:order-1 order-2">
                            <SidebarAuthor
                                desc={adminDesc}
                                icon={faAt}
                                title='サイト管理人'
                                name={adminName}
                                image={adminImage}
                            />
                        </div>
                        <div className="lg:order-2 order-1">
                            <SidebarTopic
                                icon={faFire}
                                title='トピック'
                                topics={topics}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
