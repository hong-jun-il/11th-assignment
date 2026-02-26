export const ATTENDANCE_STATUS = {
  PRESENT: "PRESENT",
  EXCUSED: "EXCUSED",
  ABSENT: "ABSENT",
  LATE: "LATE",
} as const;

export type AttendanceStatusType =
  (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];

export type AttendanceType = {
  id: number;
  sessionId: number;
  memberId: number;
  status: AttendanceStatusType;
  lateMinutes: number | null;
  penaltyAmount: number;
  reason: string | null;
  checkedInAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SessionAttendanceSummaryType = {
  memberId: number;
  memberName: string;
  present: number;
  absent: number;
  late: number;
  excused: number;
  totalPenalty: number;
  deposit: number;
};

export type SessionAttendanceType = {
  sessionId: number;
  sessionTitle: string;
  attendances: AttendanceType[];
};

export type MemberAttendanceType = {
  memberId: number;
  memberName: string;
  generation: number;
  partName: string;
  teamName: string;
  deposit: number;
  excuseCount: number;
  attendances: AttendanceType[];
};
