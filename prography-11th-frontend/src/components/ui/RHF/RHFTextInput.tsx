"use client";

import { FieldValues, Path, useFormContext } from "react-hook-form";
import { TextInput } from "../TextInput";
import { ComponentProps } from "react";
import clsx from "clsx";

type Props<T extends FieldValues> = ComponentProps<"input"> & {
  id: string;
  name: Path<T>;
  label?: string;
};

export default function RHFTextInput<T extends FieldValues>({
  id,
  name,
  label,
  ...props
}: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  console.log(errors);

  return (
    <div>
      {label && (
        <label htmlFor={id} className={clsx("text-md", "mb-2 inline-block")}>
          {label}
        </label>
      )}
      <TextInput id={id} {...register(name)} {...props} />
      {errors[name] && (
        <p className={clsx("px-1 text-xs text-red-500")}>
          {errors[name].message?.toString()}
        </p>
      )}
    </div>
  );
}
