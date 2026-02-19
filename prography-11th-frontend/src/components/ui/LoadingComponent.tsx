"use client";

import clsx from "clsx";

export default function LoadingComponent() {
  return (
    <div
      className={clsx(
        "h-full w-full",
        "flex items-center justify-center",
        "text-2xl",
      )}
    >
      로딩중
    </div>
  );
}
