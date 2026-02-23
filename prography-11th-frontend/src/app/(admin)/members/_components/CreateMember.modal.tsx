"use client";

import Portal from "@/components/Portal";
import Button from "@/components/ui/Button";
import { OptionType } from "@/components/ui/Select";
import { useGetCohort, useGetCohorts } from "@/hooks/queries";
import clsx from "clsx";
import { useFormContext, useWatch } from "react-hook-form";
import type { MemberFormInputType } from "./MemberFormProvider";
import RHFTextInput from "@/components/ui/RHF/RHFTextInput";
import RHFSelect from "@/components/ui/RHF/RHFSelect";
import MemberFormProvider from "./MemberFormProvider";
import AsyncBoundary from "@/components/AsyncBoundary";
import LoadingComponent from "@/components/ui/LoadingComponent";

export default function CreateMemberModal() {
  return (
    <Portal>
      <MemberFormProvider>
        <div
          className={clsx(
            "fixed inset-0",
            "flex h-full w-full items-center justify-center",
            "bg-black/10",
          )}
        >
          <AsyncBoundary pendingFallback={<LoadingComponent />}>
            <MemberForm />
          </AsyncBoundary>
        </div>
      </MemberFormProvider>
    </Portal>
  );
}

function MemberForm() {
  const { handleSubmit } = useFormContext<MemberFormInputType>();

  const { data: cohortsData } = useGetCohorts();

  const cohortsOptions: OptionType<number>[] = cohortsData.data
    ? cohortsData.data.map((cohort) => ({
        value: cohort.id,
        label: cohort.name,
      }))
    : [];

  const cohortId = useWatch<MemberFormInputType>({
    name: "cohortId",
  });

  console.log(cohortId);

  return (
    <form>
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

      <RHFTextInput<MemberFormInputType>
        id="phone"
        name="phone"
        label="전화번호"
        placeholder="010-0000-0000"
      />
      <div>
        <Button text="등록" />
        <Button text="취소" />
      </div>
    </form>
  );
}
