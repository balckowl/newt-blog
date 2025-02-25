import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../molecules/sidebar";
import Link from "next/link";
import { Category } from "@/types/article";

type Props = {
  icon: IconDefinition
  title: string
  categories: Category[]
}

export default function SidebarCategory({ icon, title, categories }: Props) {
  return (
    <Sidebar icon={icon} title={title}>
      <ul>
        {categories.map((category) => (
          <Link href={`/${category.topic.slug}/${category.slug}/page/1`} key={category.name}>
            <li className="p-3 border-b">{category.name}</li>
          </Link>
        ))}
      </ul>
    </Sidebar>
  );
}
