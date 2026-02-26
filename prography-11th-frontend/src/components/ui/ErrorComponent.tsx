import clsx from "clsx";
import { FallbackProps } from "react-error-boundary";
import Button from "./Button";

export default function ErrorComponent({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  console.error(error);
  return (
    <div
      className={clsx(
        "h-full w-full",
        "flex flex-col items-center justify-center gap-5",
        "text-2xl",
      )}
    >
      <div>에러가 발생했습니다</div>
      <Button text="다시 시도하기" onClick={resetErrorBoundary} />
    </div>
  );
}
