import clsx from "clsx";
import { ComponentProps, forwardRef } from "react";

export type OptionType<T extends string | number = string> = {
  value: T;
  label: string;
};

type Props = ComponentProps<"select"> & {
  id: string;
  name: string;
  options: OptionType<any>[];
};

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ id, name, options, className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        id={id}
        name={name}
        className={clsx(
          "h-10 w-full min-w-[100px]",
          "px-3",
          "bg-white",
          "rounded-sm border border-gray-300",
          "focus:border-black",
          "transition-colors duration-200",
          "outline-none",
          className,
        )}
        {...props}
      >
        {options.length > 0 ? (
          options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))
        ) : (
          <option value="">선택할 값이 없습니다</option>
        )}
      </select>
    );
  },
);
