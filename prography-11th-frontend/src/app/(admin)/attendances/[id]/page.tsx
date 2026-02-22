import AsyncBoundary from "@/components/AsyncBoundary";
import LoadingComponent from "@/components/ui/LoadingComponent";
import AttendanceInfo from "./_components/AttendanceInfo";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AttendanceDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <AsyncBoundary pendingFallback={<LoadingComponent />}>
        <AttendanceInfo id={id} />
      </AsyncBoundary>
    </div>
  );
}
