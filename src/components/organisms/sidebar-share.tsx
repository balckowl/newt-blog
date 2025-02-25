import { faShare } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../molecules/sidebar";
import { Article, Topic } from "@/types/article";
import SnsList from "./sns-list";

type Props = {
  article: Article;
  topic: Topic | null;
}

export default function SidebarShare({ article, topic }: Props) {
  return (
    <Sidebar icon={faShare} title="共有">
      <div className="p-3">
        <SnsList article={article} topic={topic}/>
      </div>
    </Sidebar>
  );
}
