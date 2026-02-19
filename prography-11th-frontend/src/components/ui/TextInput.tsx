"use client";

import clsx from "clsx";
import { ComponentProps, forwardRef } from "react";

type Props = ComponentProps<"input"> & { name: string; id: string };

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ type = "text", name, id, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        name={name}
        id={id}
        className={clsx(
          "h-10 w-full min-w-[200px]",
          "px-3",
          "bg-white",
          "rounded-sm border border-gray-300",
          "focus:border-black",
          "transition-colors duration-200",
          "outline-none",
          className,
        )}
        {...props}
      />
    );
  },
);

TextInput.displayName = "TextInput";
