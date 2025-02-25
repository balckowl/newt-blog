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
    <div className="flex gap-2 items-center">
      {items.map((item) => (
        <div className="flex gap-2 items-center" key={item.name}>
          <Link href={`/${item.slug}`} className="text-[0.8rem] hover:underline hover:decoration-1">
            {item.name}
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className="size-2" />
        </div>
      ))}
    </div>
  );
}
