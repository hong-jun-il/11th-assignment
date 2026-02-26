"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo/logo.webp";

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { name: "회원 관리", path: "/members" },
    { name: "출결 관리", path: "/attendances" },
    { name: "세션 관리", path: "/sessions" },
  ];

  return (
    <nav
      className={clsx(
        "min-h-dvh w-1/4",
        "flex shrink-0 flex-col gap-20",
        "px-5 py-8",
        "bg-gray-300",
      )}
    >
      <div className={clsx("aspect-auto w-1/2", "mx-auto")}>
        <Image src={logo} alt="logo" />
      </div>
      <ul className={clsx("w-full", "flex flex-1 flex-col items-center gap-1")}>
        {links.map(({ name, path }) => {
          const isActive = pathname.includes(path);

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
