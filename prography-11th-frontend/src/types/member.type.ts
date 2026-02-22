export const MEMBER_ROLE = {
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
} as const;

export const MEMBER_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  WITHDRAWN: "WITHDRAWN",
} as const;

export type MemberRoleType = (typeof MEMBER_ROLE)[keyof typeof MEMBER_ROLE];
export type MemberStatusType =
  (typeof MEMBER_STATUS)[keyof typeof MEMBER_STATUS];

export type MemberType = {
  id: number;
  loginId: string;
  name: string;
  partName: string;
  phone: string;
  deposit: number;
  generation: number;
  role: MemberRoleType;
  status: MemberStatusType;
  teamName: string;
  createdAt: string;
  updatedAt: string;
};
