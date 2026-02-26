"use client";

import clsx from "clsx";
import InfoWrapper from "./InfoWrapper";
import { useGetMember, useGetMemberAttendances } from "@/hooks/queries";
import { InfoItemType } from "./InfoItem";
import AttendanceHistory from "./AttendanceHistory";

type Props = {
  id: string;
};

const isThisWeek = (dateString: string): boolean => {
  const targetDate = new Date(dateString);
  const now = new Date();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return targetDate >= startOfWeek && targetDate < endOfWeek;
};

export default function AttendanceInfo({ id }: Props) {
  const { data: memberData } = useGetMember(+id);
  const { data: memberAttendanceData } = useGetMemberAttendances(+id);

  const { name, generation, loginId, partName, phone, teamName } =
    memberData.data!;

  const attendanceHistory = memberAttendanceData.data?.attendances ?? [];

  let weeklyPenaltyAmount = 0;
  const totalPenaltyAmount = attendanceHistory.reduce((acc, cur) => {
    if (
      (cur.status === "ABSENT" || cur.status === "LATE") &&
      cur.penaltyAmount > 0
    ) {
      acc += cur.penaltyAmount;

      if (isThisWeek(cur.updatedAt)) {
        weeklyPenaltyAmount += cur.penaltyAmount;
      }
    }

    return acc;
  }, 0);

  const memberInfoItems: InfoItemType[] = [
    { label: "이름", value: name },
    { label: "기수", value: generation },
    { label: "ID", value: loginId },
    { label: "파트", value: partName },
    { label: "핸드폰 번호", value: phone },
    { label: "참여팀", value: teamName },
  ];

  const paneltyInfoItems: InfoItemType[] = [
    { label: "이번주 지각비", value: `${weeklyPenaltyAmount}원` },
    { label: "", value: "" },
    { label: "누적 지각비", value: `${totalPenaltyAmount}원` },
    { label: "", value: "" },
    { label: "잔여 보증금", value: `${memberAttendanceData.data!.deposit}원` },
  ];

  return (
    <div className={clsx("space-y-5 px-8")}>
      <InfoWrapper title="회원 정보" items={memberInfoItems} />
      <InfoWrapper title="벌금 현황" items={paneltyInfoItems} />
      <AttendanceHistory id={+id} />
    </div>
  );
}
