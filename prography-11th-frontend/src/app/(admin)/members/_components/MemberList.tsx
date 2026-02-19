"use client";

import Pagination from "@/components/ui/Pagination";
import { useGetMembers } from "@/hooks/queries";
import { MEMBER_ROLE_MATCHER, MEMBER_STATUS_MATCHER } from "@/utils/matcher";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { MemberSearchType } from "./MemberSearch";

const tableHead = [
  "순서",
  "이름",
  "파트",
  "팀명",
  "아이디",
  "핸드폰",
  "역할",
  "활동상태",
];

export default function MemberList() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearchType: MemberSearchType = (searchParams.get("searchType") ||
    "name") as MemberSearchType;
  const currentSearchValue = searchParams.get("searchValue") || "";

  const { data } = useGetMembers({
    page: currentPage - 1,
    searchType: currentSearchType,
    searchValue: currentSearchValue,
  });

  const totalMembers = data.data?.totalElements;
  const members = data.data?.content ?? [];

  useEffect(() => {
    if (data?.data && currentPage < data.data.totalPages - 1) {
      const nextPage = currentPage + 1;
    }
  }, [currentPage]);

  return (
    <div className={clsx("flex flex-1 flex-col justify-between", "px-3")}>
      <div className={clsx("space-y-5")}>
        <h3 className={clsx("text-lg font-semibold")}>전체 {totalMembers}명</h3>

        <table className={clsx("w-full", "[&_td]:border [&_th]:border")}>
          <thead>
            <tr className={clsx("bg-amber-200")}>
              {tableHead.map((head) => (
                <th key={head} className="py-1">
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {members.map((member, i) => (
              <tr
                key={member.id}
                className={clsx(
                  "cursor-pointer hover:bg-amber-100",
                  "transition-colors duration-150",
                )}
              >
                <th>{i + 1}</th>
                <td className={clsx("py-2 text-center")}>{member.name}</td>
                <td className={clsx("py-2 text-center")}>{member.partName}</td>
                <td className={clsx("py-2 text-center")}>{member.teamName}</td>
                <td className={clsx("py-2 text-center")}>{member.loginId}</td>
                <td className={clsx("py-2 text-center")}>{member.phone}</td>
                <td className={clsx("py-2 text-center")}>
                  {MEMBER_ROLE_MATCHER[member.role]}
                </td>
                <td className={clsx("py-2 text-center")}>
                  {MEMBER_STATUS_MATCHER[member.status]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={clsx("flex justify-center")}>
        <Pagination totalPages={data.data?.totalPages ?? 1} />
      </div>
    </div>
  );
}
