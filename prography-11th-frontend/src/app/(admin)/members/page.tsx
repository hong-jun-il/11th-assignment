"use client";

import PageHeader from "../_components/PageHeader";
import MemberSearch from "./_components/MemberSearch";
import MemberList from "./_components/MemberList";
import AsyncBoundary from "@/components/AsyncBoundary";
import ErrorComponent from "@/components/ui/ErrorComponent";
import LoadingComponent from "@/components/ui/LoadingComponent";
import clsx from "clsx";

export default function Members() {
  return (
    <div className={clsx("h-full", "flex flex-col justify-between")}>
      <PageHeader />
      <MemberSearch />
      <AsyncBoundary
        errorFallback={(props) => <ErrorComponent {...props} />}
        pendingFallback={<LoadingComponent />}
      >
        <MemberList />
      </AsyncBoundary>
    </div>
  );
}
