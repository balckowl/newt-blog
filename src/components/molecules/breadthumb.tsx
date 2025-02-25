import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
  items: Item[]
}

type Item = {
  name: string;
  slug: string;
}

export default function Breadthumb({ items }: Props) {
  return (
    <nav aria-label="breadcrumb">
      <ul className="flex gap-2 items-center">
        {items.map((item) => (
          <li className="flex gap-2 items-center" key={item.name}>
            <Link href={`/${item.slug}`} className="text-[0.8rem] hover:underline hover:decoration-1">
              {item.name}
            </Link>
            <FontAwesomeIcon icon={faChevronRight} className="size-2" />
          </li>
        ))}
      </ul>
    </nav>
  );
}
