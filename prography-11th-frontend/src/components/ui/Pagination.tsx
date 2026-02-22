"use client";

import PaginationLeft from "@/assets/icons/pagination_left";
import PaginationLeftSkip from "@/assets/icons/pagination_left_skip";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  totalPages: number;
};

const WINDOW_SIZE = 5;

export default function Pagination({ totalPages = 1 }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const startPage =
    Math.floor((currentPage - 1) / WINDOW_SIZE) * WINDOW_SIZE + 1;
  const endPage = Math.min(startPage + WINDOW_SIZE - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 || 1 },
    (_, i) => startPage + i,
  );

  const handlePagination = (page: number) => {
    if (page <= 0 || page > totalPages || page === currentPage) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params}`);
  };

  return (
    <div className={clsx("w-fit", "flex gap-5")}>
      <div className={clsx("flex")}>
        <button disabled={currentPage <= 1} onClick={() => handlePagination(1)}>
          <PaginationLeftSkip size={18} />
        </button>
        <button
          disabled={currentPage <= 1}
          onClick={() => handlePagination(currentPage - 1)}
        >
          <PaginationLeft size={18} />
        </button>
      </div>

      <ul className={clsx("flex flex-1 justify-between gap-2")}>
        {pages.map((page) => (
          <li key={page} className="w-5 text-center">
            <button
              className={clsx(currentPage === page && "font-bold underline")}
              disabled={currentPage === page}
              onClick={() => handlePagination(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <div className={clsx("flex", "rotate-y-180")}>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => handlePagination(totalPages)}
        >
          <PaginationLeftSkip size={18} />
        </button>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => handlePagination(currentPage + 1)}
        >
          <PaginationLeft size={18} />
        </button>
      </div>
    </div>
  );
}
