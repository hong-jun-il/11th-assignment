"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function PageHeader() {
  const pathname = usePathname();

  return (
    <header className={clsx("w-full", "mb-10")}>
      <h2 className={clsx("text-xl font-medium", "mb-3 px-3")}>회원 관리</h2>
      <hr />
    </header>
  );
}
