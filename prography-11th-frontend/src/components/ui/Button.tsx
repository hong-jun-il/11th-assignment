import clsx from "clsx";
import { ComponentProps } from "react";

type Props = ComponentProps<"button"> & { text: string };

export default function Button({
  text,
  type = "button",
  className,
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={clsx(
        "h-10 px-8",
        "text-sm",
        "cursor-pointer",
        "bg-black text-white",
        "rounded-sm",
        "whitespace-nowrap",
        className,
      )}
      {...props}
    >
      {text}
    </button>
  );
}
