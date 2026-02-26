"use client";

import clsx from "clsx";
import { ComponentProps, forwardRef, useId } from "react";
import { OptionType } from "./Select";

type Props<T> = ComponentProps<"input"> & {
  options: OptionType<T>[];
};

export const ComboBox = forwardRef<HTMLInputElement, Props<any>>(
  ({ type, name, id, className, readOnly, options, ...props }, ref) => {
    const generatedId = useId();
    const listId = `list-${id || generatedId}`;

    return (
      <div>
        <input
          ref={ref}
          type={type || "text"}
          list={listId}
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

        <datalist id={listId}>
          <option value="">선택해주세요</option>
          {options.map(({ value, label }) => (
            <option key={String(value)} value={value}>
              {label}
            </option>
          ))}
        </datalist>
      </div>
    );
  },
);

ComboBox.displayName = "ComboBox";
