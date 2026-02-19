import { api } from "@/api/api";
import { PAGE_PER_COUNT } from "@/constants/pagination_count.const";
import type {
  GetMembersRequestType,
  GetMembersResponseType,
} from "@/types/member.type";
import type { ResponseType } from "@/types/response.type";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetMembers({
  page = 0,
  size = PAGE_PER_COUNT,
  searchType,
  searchValue,
  generation,
  partName,
  status,
}: GetMembersRequestType) {
  return useSuspenseQuery({
    queryKey: [
      "members",
      page,
      size,
      searchType,
      searchValue,
      generation,
      partName,
      status,
    ],
    queryFn: async () => {
      const res = await api.get<Promise<ResponseType<GetMembersResponseType>>>(
        "/admin/members",
        {
          params: {
            page,
            size,
            searchType,
            searchValue,
            generation,
            partName,
            status,
          },
        },
      );

      return res.data;
    },
  });
}
