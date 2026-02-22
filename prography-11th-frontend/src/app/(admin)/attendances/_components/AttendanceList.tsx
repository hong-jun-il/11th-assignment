"use client";

import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import { useGetSessionAttendances, useGetSessions } from "@/hooks/queries";
import { formatLocalDate } from "@/utils/formatDate";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

const tableHead = [
  "순서",
  "이름",
  "출석",
  "지각",
  "결석",
  "공결",
  "누적 벌금",
  "남은 보증금",
];

export default function AttendanceList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const now = new Date();
  const yearAgo = new Date();
  yearAgo.setFullYear(now.getFullYear() - 1);

  const currentPage = Number(searchParams.get("page")) || 1;
  const dateFrom = searchParams.get("start") || formatLocalDate(yearAgo);
  const dateTo = searchParams.get("end") || formatLocalDate(now);

  const { data: sessionData } = useGetSessions(dateFrom, dateTo);

  const sessionIds = sessionData.data?.map((session) => session.id) || [];

  // 클라이언트에서 모든 데이터를 메모리에 올려놓고 페이지네이션을 구현하기에 prefetch를 하지 않습니다
  const { content, totalElements, totalPages } = useGetSessionAttendances({
    ids: sessionIds,
    page: currentPage - 1,
  });

  return (
    <div className={clsx("flex flex-1 flex-col justify-between gap-5", "px-3")}>
      <div className={clsx("space-y-5")}>
        <h3 className={clsx("text-lg font-semibold")}>
          전체 {totalElements}명
        </h3>

        <table className={clsx("w-full flex-1", "[&_td]:border [&_th]:border")}>
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
            {content.length > 0 ? (
              content.map((attendance, i) => (
                <tr
                  key={attendance.memberId}
                  onClick={() =>
                    router.push(`/attendances/${attendance.memberId}`)
                  }
                  className={clsx(
                    "cursor-pointer hover:bg-amber-100",
                    "transition-colors duration-150",
                  )}
                >
                  <th>{i + 1}</th>
                  <td className={clsx("py-2 text-center")}>
                    {attendance.memberName}
                  </td>
                  <td className={clsx("py-2 text-center")}>
                    {attendance.present}
                  </td>
                  <td className={clsx("py-2 text-center")}>
                    {attendance.late}
                  </td>
                  <td className={clsx("py-2 text-center")}>
                    {attendance.absent}
                  </td>
                  <td className={clsx("py-2 text-center")}>
                    {attendance.excused}
                  </td>
                  <td className={clsx("py-2 text-center")}>
                    {attendance.totalPenalty}원
                  </td>
                  <td className={clsx("py-2 text-center")}>
                    {attendance.deposit}원
                  </td>
                </tr>
              ))
            ) : (
              <tr className="h-[30dvh]">
                <td
                  colSpan={tableHead.length}
                  className="text-center text-gray-500"
                >
                  해당 기간 내의 출석 데이터가 존재하지 않습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={clsx("flex justify-end")}>
        <Button text="추가" />
      </div>

      <div className={clsx("flex justify-center")}>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
