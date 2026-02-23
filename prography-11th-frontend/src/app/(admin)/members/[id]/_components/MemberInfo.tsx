"use client";

import { useGetCohort, useGetCohorts, useGetMember } from "@/hooks/queries";
import clsx from "clsx";
import RHFTextInput from "@/components/ui/RHF/RHFTextInput";
import { OptionType } from "@/components/ui/Select";
import RHFSelect from "@/components/ui/RHF/RHFSelect";
import Button from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { useFormContext } from "react-hook-form";
import type {
  MemberFormInputType,
  MemberFormOutputType,
} from "../../_components/MemberFormProvider";
import { useDeleteMember, useUpdateMember } from "@/hooks/mutations";
import { useEffect } from "react";

type Props = {
  id: string;
};

export default function MemberInfo({ id }: Props) {
  const { handleSubmit, reset } = useFormContext<MemberFormInputType>();

  const { data: memberdata } = useGetMember(+id);

  const { data: cohortsData } = useGetCohorts();

  const { data: cohortData } = useGetCohort(memberdata.data?.generation!);

  const { mutate: updateMutate, isPending: updatePending } =
    useUpdateMember(+id);
  const { mutate: deleteMutate, isPending: deletePending } = useDeleteMember();

  const cohortsOptions: OptionType<number>[] = cohortsData.data
    ? cohortsData.data.map((cohort) => ({
        value: cohort.id,
        label: cohort.name,
      }))
    : [];

  const partOptions: OptionType<number>[] =
    cohortData.data?.parts?.map((part) => ({
      value: part.id,
      label: part.name,
    })) ?? [];

  const teamOptions: OptionType<number>[] =
    cohortData.data?.teams?.map((team) => ({
      value: team.id,
      label: team.name,
    })) ?? [];

  const onSubmit = (data: MemberFormOutputType) => {
    updateMutate(data);
  };

  const onDelete = (id: number) => {
    deleteMutate(id);
  };

  useEffect(() => {
    if (memberdata.data && cohortData.data) {
      const partId =
        cohortData.data.parts?.find(
          (part) => part.name === memberdata.data?.partName,
        )?.id || 1;
      const teamId =
        cohortData.data.teams?.find(
          (team) => team.name === memberdata.data?.teamName,
        )?.id || 1;

      reset({
        name: memberdata.data.name,
        loginId: memberdata.data.loginId,
        phone: memberdata.data.phone,
        cohortId: memberdata.data.generation,
        partId,
        teamId,
      });
    }
  }, [memberdata.data, cohortData.data, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx("space-y-5 px-8")}>
      <RHFTextInput<MemberFormInputType>
        id="name"
        name="name"
        label="이름"
        placeholder="홍길동"
      />
      <RHFTextInput<MemberFormInputType>
        id="loginId"
        name="loginId"
        label="아이디"
        placeholder="아이디"
      />
      <RHFSelect<MemberFormInputType, number>
        id="cohortId"
        name="cohortId"
        options={cohortsOptions}
        label="기수"
      />
      <RHFSelect<MemberFormInputType, number>
        id="partId"
        name="partId"
        options={partOptions}
        label="파트"
      />
      <RHFTextInput<MemberFormInputType>
        id="phone"
        name="phone"
        label="전화번호"
        placeholder="010-0000-0000"
      />
      <RHFSelect<MemberFormInputType, number>
        id="teamId"
        name="teamId"
        options={teamOptions}
        label="참여팀"
      />

      <div>
        <label className={clsx("text-md", "mb-2 inline-block")}>등록일</label>
        <TextInput
          readOnly
          defaultValue={
            memberdata.data?.createdAt
              ? new Date(memberdata.data.createdAt).toLocaleString("ko-KR")
              : ""
          }
        />
      </div>

      <div className={clsx("flex justify-end gap-3")}>
        <Button type="submit" text="저장" disabled={updatePending} />
        <Button
          type="button"
          text={
            memberdata.data?.status === "WITHDRAWN"
              ? "탈퇴한 회원"
              : "회원 탈퇴"
          }
          className="bg-gray-400"
          onClick={() => onDelete(+id)}
          disabled={deletePending || memberdata.data?.status === "WITHDRAWN"}
        />
      </div>
    </form>
  );
}
