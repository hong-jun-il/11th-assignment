import { api } from "@/api/api";
import { MemberFormOutputType } from "@/app/(admin)/members/_components/MemberFormProvider";
import { MemberStatusType, MemberType } from "@/types/member.type";
import { ResponseType } from "@/types/response.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateMember(onClose: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MemberFormOutputType) => {
      const res = await api.post(`/admin/members`, data);

      return res.data;
    },
    onSuccess: () => {
      alert("멤버가 성공적으로 추가되었습니다.");
      onClose();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error: any) => {
      const serverMessage = error.response?.data?.message;
      const statusCode = error.response?.status;

      if (statusCode === 409) {
        alert(serverMessage || "이미 사용중인 로그인 아이디입니다.");
      } else {
        alert(serverMessage || "에러가 발생했습니다.");
      }

      console.error(error.response?.data || error.message);
    },
  });
}

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
    onSuccess: () => {
      alert("수정 완료!");
    },
    onSettled: async (_, __, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["member", variables] }),
        queryClient.invalidateQueries({ queryKey: ["members"] }),
      ]);
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
    onSuccess: () => {
      alert("회원 탈퇴 처리되었습니다");
    },
    onSettled: async (_, __, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["member", variables] }),
        queryClient.invalidateQueries({ queryKey: ["members"] }),
      ]);
    },
    onError: (error) => {
      console.error(error);
      alert("에러가 발생했습니다.");
    },
  });
}
