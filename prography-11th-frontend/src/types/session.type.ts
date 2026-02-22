export const SESSION_STATUS = {
  SCHEDULED: "SCHEDULED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type SessionStatusType =
  (typeof SESSION_STATUS)[keyof typeof SESSION_STATUS];

export type SessionType = {
  id: number;
  cohortId: number;
  title: string;
  date: string;
  time: string;
  location: string;
  status: SessionStatusType;
  attendanceSummary: {
    present: number;
    absent: number;
    late: number;
    excused: number;
    total: number;
  };
  qrActive: boolean;
  createdAt: string;
  updatedAt: string;
};
