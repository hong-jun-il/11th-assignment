import clsx from "clsx";
import { FallbackProps } from "react-error-boundary";

export default function ErrorComponent({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div
      className={clsx(
        "h-full w-full",
        "flex items-center justify-center",
        "text-2xl",
      )}
    >
      에러가 발생했습니다
    </div>
  );
}
