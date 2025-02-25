import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  segment: string;
};

export default function Pagination({ totalPages, currentPage, segment }: PaginationProps) {
  const generatePageNumbers = () => {
    const pages: (number | "...")[] = [];
    const range = 1; // 現在のページの前後1ページを表示

    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 1ページ目
    pages.push(1);

    // 省略記号を挿入
    if (currentPage > 3) {
      pages.push("...");
    }

    // 現在のページの前後1ページを表示
    for (let i = Math.max(2, currentPage - range); i <= Math.min(totalPages - 1, currentPage + range); i++) {
      pages.push(i);
    }

    // 省略記号を挿入
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // 最後のページ
    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <nav aria-label="pagination" className="pagination flex items-center gap-2">
      {currentPage > 1 && (
        <Link rel="prev" href={currentPage === 2 ? `/` : `/${segment}/page/${currentPage - 1}`}>
          <FontAwesomeIcon icon={faChevronLeft} className="size-3"/>
        </Link>
      )}

      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <Link aria-label={`page ${page}`} className={`${page === currentPage ? "bg-[#3D3D3D] text-white" : "hover:bg-gray-300"} font-bold w-11 h-11 rounded-full grid place-content-center`} key={index} href={page === 1 ? `/` : `${segment}/${page}`}>
            <button disabled={page === currentPage}>{page}</button>
          </Link>
        ) : (
          <span aria-hidden="true" key={index}>…</span>
        )
      )}

      {currentPage < totalPages && (
        <Link rel="next" href={`${segment}/${currentPage + 1}`}>
          <FontAwesomeIcon icon={faChevronRight} className="size-3"/>
        </Link>
      )}
    </nav>
  );
}
