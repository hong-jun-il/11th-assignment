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
