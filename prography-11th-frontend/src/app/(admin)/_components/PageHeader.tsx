"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function PageHeader() {
  const pathname = usePathname();

  const getTitle = (pathname: string) => {
    if (pathname.startsWith("/members/")) {
      return "회원 관리 > 회원 상세";
    }

    if (pathname === "/members") {
      return "회원 관리";
    }

    if (pathname.startsWith("/attendances/")) {
      return "출결 관리 > 출결 내역 상세";
    }

    if (pathname === "/attendances") {
      return "출결 관리";
    }

    if (pathname === "/sessions") {
      return "세션 관리";
    }

    return "홈";
  };

  return (
    <div className={clsx("w-full", "mb-10")}>
      <h2 className={clsx("text-xl font-medium", "mb-3 px-3")}>
        {getTitle(pathname)}
      </h2>
      <hr />
    </div>
  );
}
