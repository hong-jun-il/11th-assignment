import MemberSearch from "./_components/MemberSearch";
import MemberList from "./_components/MemberList";
import AsyncBoundary from "@/components/AsyncBoundary";
import LoadingComponent from "@/components/ui/LoadingComponent";
import clsx from "clsx";

export default function Members() {
  return (
    <div className={clsx("h-full", "flex flex-col justify-between")}>
      <MemberSearch />
      <AsyncBoundary pendingFallback={<LoadingComponent />}>
        <MemberList />
      </AsyncBoundary>
    </div>
  );
}
