"use client";

import { useGetMember } from "@/hooks/queries";
import AttendanceMemberInfo from "./AttendanceMemberInfo";
import clsx from "clsx";

type Props = {
  id: string;
};

export default function AttendanceInfo({ id }: Props) {
  return (
    <div className={clsx("px-8")}>
      <AttendanceMemberInfo />
    </div>
  );
}
