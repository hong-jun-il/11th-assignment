"use client";

import Portal from "@/components/Portal";
import Button from "@/components/ui/Button";
import type { OptionType } from "@/components/ui/Select";
import { useGetCohort, useGetCohorts } from "@/hooks/queries";
import clsx from "clsx";
import { useFormContext, useWatch } from "react-hook-form";
import type {
  MemberFormInputType,
  MemberFormOutputType,
} from "./MemberFormProvider";
import RHFTextInput from "@/components/ui/RHF/RHFTextInput";
import RHFSelect from "@/components/ui/RHF/RHFSelect";
import MemberFormProvider from "./MemberFormProvider";
import AsyncBoundary from "@/components/AsyncBoundary";
import LoadingComponent from "@/components/ui/LoadingComponent";
import { useCreateMember } from "@/hooks/mutations";
import { useEffect } from "react";

type Props = {
  onClose: () => void;
};

export default function CreateMemberModal({ onClose }: Props) {
  return (
    <Portal>
      <MemberFormProvider>
        <div
          className={clsx(
            "fixed inset-0",
            "flex h-full w-full items-center justify-center",
            "bg-black/40",
          )}
        >
          <AsyncBoundary pendingFallback={<LoadingComponent />}>
            <MemberForm onClose={onClose} />
          </AsyncBoundary>
        </div>
      </MemberFormProvider>
    </Portal>
  );
}

function MemberForm({ onClose }: Props) {
  const { control, handleSubmit, setValue } =
    useFormContext<MemberFormInputType>();

  const { data: cohortsData } = useGetCohorts();

  const cohortsOptions: OptionType<number>[] = cohortsData.data
    ? cohortsData.data.map((cohort) => ({
        value: cohort.id,
        label: cohort.name,
      }))
    : [];

  const cohortId = useWatch({
    control,
    name: "cohortId",
  });

  const { data: cohortData } = useGetCohort(Number(cohortId));

  const partOptions: OptionType<number>[] =
    cohortData?.data?.parts?.map((part) => ({
      value: part.id,
      label: part.name,
    })) ?? [];

  const teamOptions: OptionType<number>[] =
    cohortData?.data?.teams?.map((team) => ({
      value: team.id,
      label: team.name,
    })) ?? [];

  const { mutate } = useCreateMember(onClose);

  const onSubmit = async (data: MemberFormInputType) => {
    if (data.partId === 0 || data.teamId === 0) {
      alert("올바른 참여팀 혹은 파트를 선택해주세요");
      return;
    }

    const formattedData: MemberFormOutputType = {
      ...data,
      cohortId: Number(data.cohortId),
      partId: Number(data.partId),
      teamId: Number(data.teamId),
    };

    mutate(formattedData);
  };

  useEffect(() => {
    if (partOptions.length > 0) {
      setValue("partId", partOptions[0].value);
      setValue("teamId", teamOptions[0].value);
    }
  }, [cohortId]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx("w-1/2", "space-y-3 px-5 py-5", "rounded-lg bg-white")}
    >
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

      <RHFTextInput<MemberFormInputType>
        id="password"
        name="password"
        label="비밀번호"
        placeholder="비밀번호"
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

      <div className={clsx("flex justify-end gap-3")}>
        <Button text="등록" type="submit" />
        <Button text="취소" onClick={onClose} />
      </div>
    </form>
  );
}
