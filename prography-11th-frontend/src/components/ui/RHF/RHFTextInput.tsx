import { FieldValues, Path, useFormContext, Controller } from "react-hook-form";
import { TextInput } from "../TextInput";
import { ComponentProps } from "react";
import clsx from "clsx";

type Props<T extends FieldValues> = Omit<ComponentProps<"input">, "name"> & {
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
            <TextInput
              id={id}
              {...field}
              {...props}
              value={field.value ?? ""}
            />
            {error && (
              <p className={clsx("px-1 text-xs text-red-500")}>
                {error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
