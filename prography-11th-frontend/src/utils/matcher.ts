import { AttendanceStatusType } from "@/types/attendance.type";
import type { MemberRoleType, MemberStatusType } from "@/types/member.type";

export const MEMBER_ROLE_MATCHER: Record<MemberRoleType, string> = {
  ADMIN: "관리자",
  MEMBER: "회원",
};

export const MEMBER_STATUS_MATCHER: Record<MemberStatusType, string> = {
  ACTIVE: "활동중",
  INACTIVE: "휴면",
  WITHDRAWN: "탈퇴",
};

export const ATTENDANCE_STATUS_MATCHER: Record<AttendanceStatusType, string> = {
  PRESENT: "출석",
  ABSENT: "결석",
  LATE: "지각",
  EXCUSED: "공결",
};

export const ATTENDANCE_COLOR_MATCHER: Record<AttendanceStatusType, string> = {
  PRESENT: "text-blue-600 bg-blue-200",
  ABSENT: "text-red-600 bg-red-200",
  LATE: "text-yellow-600 bg-yellow-200",
  EXCUSED: "text-gray-600 bg-gray-200",
};
