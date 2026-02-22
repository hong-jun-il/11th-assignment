"use client";

import Portal from "@/components/Portal";
import Button from "@/components/ui/Button";
import { OptionType } from "@/components/ui/Select";
import { useGetCohort, useGetCohorts, useGetMember } from "@/hooks/queries";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { MemberFormInputType } from "./MemberFormProvider";

export default function CreateMemberModal() {
  const { handleSubmit } = useFormContext<MemberFormInputType>();

  const { data: cohortsData } = useGetCohorts();

  const cohortsOptions: OptionType<number>[] = cohortsData.data
    ? cohortsData.data.map((cohort) => ({
        value: cohort.id,
        label: cohort.name,
      }))
    : [];

  return (
    <Portal>
      <div
        className={clsx(
          "flex h-full w-full items-center justify-center",
          "bg-black/10",
        )}
      >
        <form>
          <div>
            <Button text="등록" />
            <Button text="취소" />
          </div>
        </form>
      </div>
    </Portal>
  );
}
