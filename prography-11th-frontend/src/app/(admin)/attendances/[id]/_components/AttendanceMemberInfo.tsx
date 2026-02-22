"use client";

import { useGetMember } from "@/hooks/queries";
import clsx from "clsx";
import { useParams } from "next/navigation";

export default function AttendanceMemberInfo() {
  const params = useParams();
  const id = params["id"];

  const { data } = useGetMember(+id!);

  return (
    <div>
      <h2 className={clsx("")}>회원 정보</h2>
      <div>sadsa</div>
    </div>
  );
}
