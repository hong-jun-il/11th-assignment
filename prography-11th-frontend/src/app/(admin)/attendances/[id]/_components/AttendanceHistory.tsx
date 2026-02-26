"use client";

import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import { PAGE_PER_COUNT } from "@/constants/pagination_count.const";
import {
  useGetMemberAttendances,
  useGetSessionAttendances,
} from "@/hooks/queries";
import { formatKorDate, formatLocalDate } from "@/utils/formatDate";
import {
  ATTENDANCE_COLOR_MATCHER,
  ATTENDANCE_STATUS_MATCHER,
} from "@/utils/matcher";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useAttendanceModal } from "../../_components/AttendanceModalProvider";
import AttendanceModal from "./Attendance.modal";

type Props = {
  id: number;
};

const tableHead = [
  "출결상태",
  "세션명",
  "지각(분)",
  "날짜",
  "사유",
  "수정하기",
];

export default function AttendanceHistory({ id }: Props) {
  const searchParams = useSearchParams();
  const { openModal } = useAttendanceModal();

  const currentPage = Number(searchParams.get("page")) || 1;

  const { data: memberAttendanceData } = useGetMemberAttendances(id);
  const allAttendances = memberAttendanceData.data?.attendances || [];

  // 멤버 출결 데이터 페이지네이션
  const pagedAttendances = useMemo(() => {
    const start = (currentPage - 1) * PAGE_PER_COUNT;
    const end = start + PAGE_PER_COUNT;
    return allAttendances.slice(start, end);
  }, [allAttendances, currentPage]);

  // 현재 페이지네이션된 세션의 아이디들을 모은 집합
  const currentIds = useMemo(
    () => [...new Set(pagedAttendances.map((e) => e.sessionId))],
    [pagedAttendances],
  );

  // 중복 없는 아이디들의 집합으로 세션명 데이터를 가져옴
  const { content: sessionDetails } = useGetSessionAttendances({
    ids: currentIds,
  });

  // 아이디 - 세션명 Map 객체
  const sessionMap = useMemo(() => {
    return new Map(sessionDetails.map((s) => [s.sessionId, s.sessionTitle]));
  }, [sessionDetails]);

  // sessionMap 객체를 통해 세션 타이틀을 매핑함
  const tableData = useMemo(() => {
    return pagedAttendances.map((attendance) => ({
      ...attendance,
      sessionTitle: sessionMap.get(attendance.sessionId) || "로딩 중...",
    }));
  }, [pagedAttendances, sessionMap]);

  const totalPages = Math.ceil(allAttendances.length / PAGE_PER_COUNT);

  return (
    <div className={clsx("mt-10 space-y-5")}>
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
          {tableData.length > 0 ? (
            tableData.map((data) => (
              <tr key={data.id}>
                <td className={clsx("py-2 text-center")}>
                  <div
                    className={clsx(
                      "w-fit rounded-lg",
                      "px-4 py-1",
                      "mx-auto",
                      ATTENDANCE_COLOR_MATCHER[data.status],
                    )}
                  >
                    {ATTENDANCE_STATUS_MATCHER[data.status]}
                  </div>
                </td>
                <td className={clsx("py-2 text-center")}>
                  {data.sessionTitle}
                </td>
                <td className={clsx("py-2 text-center")}>
                  {!data.lateMinutes ? "-" : `${data.lateMinutes}분`}
                </td>
                <td className={clsx("py-2 text-center")}>
                  {formatKorDate(formatLocalDate(new Date(data.createdAt)))}
                </td>
                <td className={clsx("py-2 text-center")}>
                  {!data.reason ? "-" : data.reason}
                </td>
                <td className={clsx("py-2 text-center")}>
                  <Button text="수정" onClick={() => openModal(data)} />
                </td>
              </tr>
            ))
          ) : (
            <tr className="h-[30dvh]">
              <td
                colSpan={tableHead.length}
                className="text-center text-gray-500"
              >
                해당 멤버의 출석 데이터가 존재하지 않습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={clsx("flex justify-center")}>
        <Pagination totalPages={totalPages || 1} />
      </div>
    </div>
  );
}
