"use client";

import { ComponentProps } from "react";
import { OptionType, Select } from "../Select";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import clsx from "clsx";

type Props<
  T extends FieldValues,
  F extends string | number,
> = ComponentProps<"select"> & {
  id: string;
  name: Path<T>;
  options: OptionType<F>[];
  label?: string;
};

export default function RHFSelect<
  T extends FieldValues,
  F extends string | number,
>({ id, name, options, label, ...props }: Props<T, F>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div>
      {label && (
        <label htmlFor={id} className={clsx("text-md", "mb-2 inline-block")}>
          {label}
        </label>
      )}
      <Select id={id} {...register(name)} options={options} {...props} />
      {errors[name] && errors[name].message && (
        <p className={clsx("px-1 text-xs text-red-500")}>
          {errors[name].message.toString()}
        </p>
      )}
    </div>
  );
}
