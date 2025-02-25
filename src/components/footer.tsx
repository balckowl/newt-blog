import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="py-6 border-t md:border-none">
          <Link href="/" className="flex gap-2 items-center hover:underline justify-center mb-1">
            <FontAwesomeIcon icon={faHome} className="size-4"/>
            ホームへ戻る
          </Link>
          <p className="text-[0.8rem] text-gray-500 text-center">&copy; 2025 ふむふむ.com</p>
        </div>
    );
}
