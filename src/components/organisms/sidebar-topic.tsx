import Link from "next/link";
import Sidebar from "../molecules/sidebar";
import { Topic } from "@/types/article";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Props = {
  icon: IconDefinition;
  title: string;
  topics: Topic[];
};

export default function SidebarTopic({ icon, title, topics }: Props) {
  return (
    <Sidebar icon={icon} title={title}>
      <ul>
        {topics.map((topic) => (
          <li key={topic.name} className="p-3 border-b">
            <Link href={`/${topic.slug}/page/1`} className="block w-full h-full">
              {topic.name}
            </Link>
          </li>
        ))}
      </ul>
    </Sidebar>
  );
}
