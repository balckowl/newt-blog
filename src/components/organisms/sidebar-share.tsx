import { faShare } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../molecules/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBluesky, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Link from "next/link";

export default function SidebarShare() {
  return (
    <Sidebar icon={faShare} title="共有">
      <div className="p-3">
        <div className="flex gap-1">
          <Link
            href={`https://x.com/intent/tweet?text=${1}&url=${1}/blog/${1}`}
            className="size-[40px] bg-black grid place-content-center rounded-[10px] border hover:translate-y-[-5px] transition-transform duration-300"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faXTwitter}
              className="text-white"
            />
          </Link>
          <Link
            href={`https://bsky.app/intent/compose?text=${1} + ${1}/blog/${1}`}
            className="size-[40px] grid place-content-center rounded-[10px] border bg-[#1185fe] hover:translate-y-[-5px] transition-transform duration-300"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faBluesky}
              className="text-white"
            />
          </Link>
          <Link
            href={`https://taittsuu.com/share?text=${1} + ${1}/blog/${1}`}
            className="size-[40px] grid place-content-center rounded-[10px] border hover:translate-y-[-5px] transition-transform duration-300"
            target="_blank">
            <Image width={27} height={27} src="/taittsuu.png" className="size-[27px]" alt="" />
          </Link>
        </div>
      </div>
    </Sidebar>
  );
}
