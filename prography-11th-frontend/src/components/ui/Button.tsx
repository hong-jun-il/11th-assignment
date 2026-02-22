import clsx from "clsx";
import { ComponentProps } from "react";

type Props = ComponentProps<"button"> & { text: string };

export default function Button({
  text,
  type = "button",
  disabled,
  className,
  ...props
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "h-10 px-8",
        "text-sm",
        "bg-black text-white",
        "rounded-sm",
        "whitespace-nowrap",
        "transition-colors duration-200",
        "cursor-pointer",
        className,
      )}
      {...props}
    >
      {text}
    </button>
  );
}
