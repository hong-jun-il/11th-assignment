"use client";

import Pagination from "@/components/ui/Pagination";
import { getMembers, useGetMembers } from "@/hooks/queries";
import { MEMBER_ROLE_MATCHER, MEMBER_STATUS_MATCHER } from "@/utils/matcher";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MemberSearchType } from "./MemberSearch";
import Button from "@/components/ui/Button";
import CreateMemberModal from "./CreateMember.modal";

const tableHead = [
  "이름",
  "기수",
  "파트",
  "팀명",
  "아이디",
  "핸드폰",
  "역할",
  "활동상태",
];

export default function MemberList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

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

  // 다음 페이지가 존재할 시 다음 페이지를 미리 prefetch 합니다
  const queryClient = useQueryClient();
  useEffect(() => {
    if (data?.data && currentPage < data.data.totalPages) {
      const nextPage = currentPage;

      queryClient.prefetchQuery({
        queryKey: ["members", nextPage, currentSearchType, currentSearchValue],
        queryFn: () =>
          getMembers({
            page: nextPage,
            searchType: currentSearchType,
            searchValue: currentSearchValue,
          }),
        staleTime: 1000 * 60 * 5,
      });
    }
  }, [currentPage]);

  return (
    <div className={clsx("flex flex-1 flex-col justify-between gap-5", "px-3")}>
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
            {members.length > 0 ? (
              members.map((member, i) => (
                <tr
                  key={member.id}
                  onClick={() => router.push(`/members/${member.id}`)}
                  className={clsx(
                    "cursor-pointer hover:bg-amber-100",
                    "transition-colors duration-150",
                  )}
                >
                  <th className={clsx("py-2 text-center")}>{member.name}</th>
                  <td className={clsx("py-2 text-center")}>
                    {member.generation}기
                  </td>
                  <td className={clsx("py-2 text-center")}>
                    {member.partName}
                  </td>
                  <td className={clsx("py-2 text-center")}>
                    {member.teamName}
                  </td>
                  <td className={clsx("py-2 text-center")}>{member.loginId}</td>
                  <td className={clsx("py-2 text-center")}>{member.phone}</td>
                  <td className={clsx("py-2 text-center")}>
                    {MEMBER_ROLE_MATCHER[member.role]}
                  </td>
                  <td className={clsx("py-2 text-center")}>
                    {MEMBER_STATUS_MATCHER[member.status]}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="h-[30dvh]">
                <td
                  colSpan={tableHead.length}
                  className="text-center text-gray-500"
                >
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={clsx("flex justify-end")}>
        <Button
          text="추가"
          type="button"
          onClick={() => setModalIsOpen(true)}
        />
      </div>

      <div className={clsx("flex justify-center")}>
        <Pagination totalPages={data.data?.totalPages ?? 1} />
      </div>

      {modalIsOpen && (
        <CreateMemberModal onClose={() => setModalIsOpen(false)} />
      )}
    </div>
  );
}
