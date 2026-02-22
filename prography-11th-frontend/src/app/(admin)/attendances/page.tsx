import AsyncBoundary from "@/components/AsyncBoundary";
import LoadingComponent from "@/components/ui/LoadingComponent";
import clsx from "clsx";
import AttendanceSearch from "./_components/AttendanceSearch";
import AttendanceList from "./_components/AttendanceList";

export default function Attendance() {
  return (
    <div className={clsx("h-full", "flex flex-col justify-between")}>
      <AttendanceSearch />
      <AsyncBoundary pendingFallback={<LoadingComponent />}>
        <AttendanceList />
      </AsyncBoundary>
    </div>
  );
}
