"use client";

import { ComponentProps } from "react";
import { OptionType, Select } from "../Select";
import { FieldValues, Path, useFormContext, Controller } from "react-hook-form";
import clsx from "clsx";

type Props<T extends FieldValues, F extends string | number> = Omit<
  ComponentProps<"select">,
  "name"
> & {
  id: string;
  name: Path<T>;
  options: OptionType<F>[];
  label?: string;
};

export default function RHFSelect<
  T extends FieldValues,
  F extends string | number,
>({ id, name, options, label, ...props }: Props<T, F>) {
  const { control } = useFormContext<T>();

  return (
    <div>
      {label && (
        <label htmlFor={id} className={clsx("text-md", "mb-2 inline-block")}>
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select {...props} id={id} options={options} {...field} />
            {error && (
              <p className={clsx("px-1 text-xs text-red-500")}>
                {error.message?.toString()}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
