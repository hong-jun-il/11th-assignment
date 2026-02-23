import { api } from "@/api/api";
import { MemberFormOutputType } from "@/app/(admin)/members/_components/MemberFormProvider";
import { MemberStatusType, MemberType } from "@/types/member.type";
import { ResponseType } from "@/types/response.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateMember(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: MemberFormOutputType,
    ): Promise<ResponseType<MemberType>> => {
      const { loginId, ...rest } = data;
      const res = await api.put(`/admin/members/${id}`, rest);

      return res.data;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["member", id] }),
        queryClient.invalidateQueries({ queryKey: ["members"] }),
      ]);
      alert("수정 완료!");
    },
    onError: (error) => {
      console.error(error);
      alert("에러가 발생했습니다.");
    },
  });
}

export function useDeleteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      id: number,
    ): Promise<
      ResponseType<{
        id: number;
        loginId: string;
        name: string;
        status: MemberStatusType;
        updatedAt: Date;
      }>
    > => {
      const res = await api.delete(`/admin/members/${id}`);

      return res.data;
    },
    onSuccess: async (_, deletedId) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["member", deletedId] }),
        queryClient.invalidateQueries({ queryKey: ["members"] }),
      ]);
      alert("회원 탈퇴 처리되었습니다");
    },
    onError: (error) => {
      console.error(error);
      alert("에러가 발생했습니다.");
    },
  });
}
