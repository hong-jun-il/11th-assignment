/**
 * 리액트의 Suspense와 ErrorBoundary를 결합한 커스텀 컴포넌트입니다.
 * 클라이언트 전용이며, 서버에서는 사용할 수 없습니다.
 * @param props.pendingFallback - 로딩 중(Suspense)에 보여줄 컴포넌트
 * @param props.errorFallback - 에러 발생 시 보여줄 컴포넌트, render props 패턴을 사용합니다
 * @param props.children - 비동기 로직이 포함된 자식 컴포넌트
 */

import { Suspense, type ComponentProps } from "react";
import { ErrorBoundary } from "react-error-boundary";

type ErrorBoundaryProps = Omit<
  ComponentProps<typeof ErrorBoundary>,
  "fallback" | "fallbackRender" | "FallbackComponent"
>;

type SuspenseProps = Omit<ComponentProps<typeof Suspense>, "fallback">;

type Props = ErrorBoundaryProps &
  SuspenseProps & {
    errorFallback: NonNullable<
      ComponentProps<typeof ErrorBoundary>["fallbackRender"]
    >;
    pendingFallback: ComponentProps<typeof Suspense>["fallback"];
  };

export default function AsyncBoundary({
  errorFallback,
  pendingFallback,
  children,
  ...errorBoundaryProps
}: Props) {
  return (
    <ErrorBoundary fallbackRender={errorFallback} {...errorBoundaryProps}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
