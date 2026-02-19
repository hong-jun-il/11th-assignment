import type { MemberSearchType } from "@/app/(admin)/members/_components/MemberSearch";

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
  createdAt: Date;
  deposit: number;
  generation: number;
  id: number;
  loginId: string;
  name: string;
  partName: string;
  phone: string;
  role: MemberRoleType;
  status: MemberStatusType;
  teamName: string;
  updatedAt: Date;
};

export type GetMembersRequestType = {
  page?: number;
  size?: number;
  searchType?: MemberSearchType;
  searchValue?: string;
  generation?: number;
  partName?: string;
  status?: MemberStatusType;
};

export type GetMembersResponseType = {
  content: MemberType[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};
