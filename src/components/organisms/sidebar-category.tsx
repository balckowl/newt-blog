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
          <li className="p-3 border-b" key={category.name}>
            <Link href={`/${category.topic.slug}/${category.slug}/page/1`} className="block w-full h-full">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </Sidebar>
  );
}
