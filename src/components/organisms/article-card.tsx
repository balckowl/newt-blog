import { Article } from "@/types/article";
import { faArrowsRotate, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type Props = {
  article: Article
  topicSlug: string;
}

export default function  ArticleCard({article, topicSlug}: Props) {


  const createdAt = format(article._sys.createdAt, "yyyy/MM/dd");
  const updateAt = format(article._sys.updatedAt, "yyyy/MM/dd")

  return (
    <Link key={article._id} href={`/${topicSlug}/${article.category.slug}/${article.slug}`} className='bg-white p-3 rounded-md'>
      <div className='relative'>
        <Image width={400} height={300} alt="" src={article.coverImage.src} className='w-full rounded-md mb-[0.5rem]' />
        <div className="absolute text-[0.7rem] font-bold px-2 text-white top-1 left-1 z-10 bg-[#3D3D3D] rounded-full">
          {article.category.name}
        </div>
      </div>
      <time className='flex gap-2 items-center text-[0.8rem] mb-[8px] text-gray-400 font-bold'>
        {createdAt === updateAt &&<FontAwesomeIcon icon={faClock} className='size-[11px] text-gray-400' />}
        {createdAt !== updateAt &&<FontAwesomeIcon icon={faArrowsRotate} className='size-[11px] text-gray-400' />}
        {updateAt}
      </time>
      <h2 className='font-bold text-[1.1rem]'>{article.title}</h2>
    </Link>
  );
}
