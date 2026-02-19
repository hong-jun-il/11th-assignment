"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { name: "회원 관리", path: "/members" },
    { name: "출결 관리", path: "/attendance" },
    { name: "세션 관리", path: "/sessions" },
  ];

  return (
    <nav
      className={clsx(
        "h-full w-1/4",
        "flex flex-col gap-20",
        "px-5 py-8",
        "bg-gray-300",
      )}
    >
      <h1 className={clsx("text-3xl font-bold")}>로고</h1>
      <ul className={clsx("w-full", "flex flex-1 flex-col items-center gap-1")}>
        {links.map(({ name, path }) => {
          const isActive = pathname === path;

          return (
            <li key={path}>
              <Link
                href={path}
                className={clsx(
                  "text-lg",
                  isActive ? "font-bold" : "font-medium",
                )}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
