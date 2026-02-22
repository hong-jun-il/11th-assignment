"use client";

import useFocusState from "@/hooks/useFocusState";
import { formatKorDate } from "@/utils/formatDate";
import clsx from "clsx";
import { ComponentProps } from "react";

type Props = Omit<ComponentProps<"input">, "type"> & {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function DateInput({
  id,
  name,
  value,
  onChange,
  className,
}: Props) {
  const { isFocus, onFocus, onBlur } = useFocusState();

  return (
    <div
      className={clsx(
        "relative",
        "text-sm",
        "px-3 py-2",
        "bg-white",
        "rounded-sm border",
        isFocus ? "border-black" : "border-gray-300",
        "transition-colors duration-200",
        className,
      )}
    >
      <label htmlFor={id} className={clsx("pointer-events-none flex gap-5")}>
        <span className="whitespace-nowrap">{formatKorDate(value)}</span>
        <span className="text-gray-400">📅</span>
      </label>

      <input
        type="date"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={(e) => e.currentTarget.showPicker()}
        className={clsx(
          "h-full w-full opacity-0",
          "absolute inset-0 z-10",
          "cursor-pointer",
        )}
      />
    </div>
  );
}
