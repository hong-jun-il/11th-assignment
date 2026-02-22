"use client";

import clsx from "clsx";
import { ComponentProps, forwardRef } from "react";

type Props = Omit<ComponentProps<"input">, "type">;

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ name, id, className, readOnly, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        name={name}
        id={id}
        disabled={readOnly}
        className={clsx(
          "h-10 w-full min-w-[200px]",
          "px-3",
          "bg-white",
          "rounded-sm border border-gray-300",
          "focus:border-black",
          "transition-colors duration-200",
          "outline-none",
          "disabled:text-gray-400",
          className,
        )}
        {...props}
      />
    );
  },
);

TextInput.displayName = "TextInput";
