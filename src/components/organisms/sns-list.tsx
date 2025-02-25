import { Article, Topic } from "@/types/article";
import { faBluesky, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

type Props = {
  article: Article,
  topic: Topic | null;
}

export default function SnsList({ article, topic }: Props) {
  return (
    <div className="flex gap-1">
      <Link
        href={`https://x.com/intent/tweet?text=${article.title}&url=${process.env.SITE_URL}/${topic!.slug}/${article.category.slug}/${article.slug}`}
        className="size-[40px] bg-black grid place-content-center rounded-[10px] border hover:translate-y-[-5px] transition-transform duration-300"
        target="_blank"
      >
        <FontAwesomeIcon
          icon={faXTwitter}
          className="text-white"
        />
      </Link>
      <Link
        href={`https://bsky.app/intent/compose?text=${article.title} + ${process.env.SITE_URL}/${topic!.slug}/${article.category.slug}/${article.slug}`}
        className="size-[40px] grid place-content-center rounded-[10px] border bg-[#1185fe] hover:translate-y-[-5px] transition-transform duration-300"
        target="_blank"
      >
        <FontAwesomeIcon
          icon={faBluesky}
          className="text-white"
        />
      </Link>
      <Link
        href={`https://taittsuu.com/share?text=${article.title} + ${process.env.SITE_URL}/${topic!.slug}/${article.category.slug}/${article.slug}`}
        className="size-[40px] grid place-content-center rounded-[10px] border hover:translate-y-[-5px] transition-transform duration-300"
        target="_blank">
        <Image width={27} height={27} src="/taittsuu.png" className="size-[27px]" alt="タイッツーのアイコン" />
      </Link>
    </div>
  );
}
