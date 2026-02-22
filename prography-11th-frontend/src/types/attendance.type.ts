export type AttendanceType = {
  memberId: number;
  memberName: string;
  present: number;
  absent: number;
  late: number;
  excused: number;
  totalPenalty: number;
  deposit: number;
};
