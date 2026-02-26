import { api } from "@/api/api";
import type { MemberSearchType } from "@/app/(admin)/members/_components/MemberSearch";
import { PAGE_PER_COUNT } from "@/constants/pagination_count.const";
import type {
  MemberAttendanceType,
  SessionAttendanceSummaryType,
  SessionAttendanceType,
} from "@/types/attendance.type";
import type { MemberStatusType, MemberType } from "@/types/member.type";
import type { PaginationType } from "@/types/pagination.type";
import type { ResponseType } from "@/types/response.type";
import type { SessionType } from "@/types/session.type";
import {
  useQuery,
  useSuspenseQueries,
  useSuspenseQuery,
} from "@tanstack/react-query";

export type GetMembersRequestType = {
  page?: number;
  size?: number;
  searchType?: MemberSearchType;
  searchValue?: string;
  generation?: number;
  partName?: string;
  status?: MemberStatusType;
};

// prefetch에 동일한 fetch 함수가 필요하므로 따로 작성하여 export합니다
export async function getMembers({
  page = 0,
  size = PAGE_PER_COUNT,
  searchType,
  searchValue,
  generation,
  partName,
  status,
}: GetMembersRequestType) {
  const res = await api.get<
    Promise<ResponseType<PaginationType<MemberType[]>>>
  >("/admin/members", {
    params: {
      page,
      size,
      searchType,
      searchValue,
      generation,
      partName,
      status,
    },
  });

  return res.data;
}

export function useGetMembers(filters: GetMembersRequestType) {
  return useSuspenseQuery({
    queryKey: ["members", ...Object.values(filters)],
    queryFn: () => getMembers(filters),
  });
}

export function useGetMember(id: number) {
  return useSuspenseQuery({
    queryKey: ["member", id],
    queryFn: async () => {
      const res = await api.get<Promise<ResponseType<MemberType>>>(
        `/admin/members/${id}`,
      );

      return res.data;
    },
  });
}

export function useGetCohorts() {
  return useSuspenseQuery({
    queryKey: ["cohorts"],
    queryFn: async () => {
      const res = await api.get<
        Promise<
          ResponseType<
            {
              id: number;
              generation: number;
              name: string;
              createdAt: string;
            }[]
          >
        >
      >("/admin/cohorts");

      return res.data;
    },
  });
}

type GetCohortResponseType = {
  id: number;
  generation: number;
  name: string;
  parts: {
    id: number;
    name: string;
  }[];
  teams: {
    id: number;
    name: string;
  }[];
  createdAt: Date;
};

export function useGetCohort(generation: number) {
  return useQuery({
    queryKey: ["cohort", generation],
    queryFn: async () => {
      const res = await api.get<Promise<ResponseType<GetCohortResponseType>>>(
        `/admin/cohorts/${generation}`,
      );

      return res.data;
    },
    enabled: !!generation,
  });
}

export function useGetSessions(dateFrom?: string, dateTo?: string) {
  return useSuspenseQuery({
    queryKey: ["sessions", dateFrom, dateTo],
    queryFn: async () => {
      const res = await api.get<Promise<ResponseType<SessionType[]>>>(
        `/admin/sessions`,
        {
          params: {
            dateFrom,
            dateTo,
          },
        },
      );

      return res.data;
    },
  });
}

export function useGetSessionAttendancesSummary({
  ids,
  page = 0,
  size = PAGE_PER_COUNT,
}: {
  ids: number[];
  page?: number;
  size?: number;
}) {
  return useSuspenseQueries({
    queries: ids.map((id) => ({
      queryKey: ["sessionAttendanceSummary", id],
      queryFn: async () => {
        const res = await api.get<
          Promise<ResponseType<SessionAttendanceSummaryType[]>>
        >(`/admin/attendances/sessions/${id}/summary`);

        return res.data;
      },
    })),
    combine: (results): PaginationType<SessionAttendanceSummaryType[]> => {
      const allData = results.flatMap((result) => result.data?.data ?? []);

      const totalElements = allData.length;
      const totalPages = Math.ceil(totalElements / size);

      const paginationStart = page * size;
      const paginationEnd = paginationStart + size;
      const pagedData = allData.slice(paginationStart, paginationEnd);

      return {
        content: pagedData,
        page,
        size,
        totalElements,
        totalPages,
      };
    },
  });
}

export function useGetMemberAttendances(id: number) {
  return useSuspenseQuery({
    queryKey: ["memberAttendance", id],
    queryFn: async () => {
      const res = await api.get<Promise<ResponseType<MemberAttendanceType>>>(
        `admin/attendances/members/${id}`,
      );

      return res.data;
    },
  });
}

export function useGetSessionAttendances({
  ids,
  page = 0,
  size = PAGE_PER_COUNT,
}: {
  ids: number[];
  page?: number;
  size?: number;
}) {
  return useSuspenseQueries({
    queries: ids.map((id) => ({
      queryKey: ["sessionAttendance", id],
      queryFn: async () => {
        const res = await api.get<Promise<ResponseType<SessionAttendanceType>>>(
          `/admin/attendances/sessions/${id}`,
        );

        return res.data;
      },
    })),
    combine: (results): PaginationType<SessionAttendanceType[]> => {
      const allData = results.flatMap((result) => result.data?.data ?? []);

      const totalElements = allData.length;
      const totalPages = Math.ceil(totalElements / size);

      const paginationStart = page * size;
      const paginationEnd = paginationStart + size;
      const pagedData = allData.slice(paginationStart, paginationEnd);

      return {
        content: pagedData,
        page,
        size,
        totalElements,
        totalPages,
      };
    },
  });
}
