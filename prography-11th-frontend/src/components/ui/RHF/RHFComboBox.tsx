"use client";

import { ComponentProps } from "react";
import { OptionType } from "../Select";
import { FieldValues, Path, useFormContext, Controller } from "react-hook-form";
import clsx from "clsx";
import { ComboBox } from "../ComboBox";

type Props<T extends FieldValues, F> = ComponentProps<"input"> & {
  id: string;
  name: Path<T>;
  options: OptionType<F>[];
  label?: string;
};

export default function RHFComboBox<T extends FieldValues, F>({
  id,
  name,
  options,
  label,
  ...props
}: Props<T, F>) {
  const { control } = useFormContext<T>();

  return (
    <div className="w-full">
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
            <ComboBox {...field} options={options} {...props} />
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
