"use client";

import { ATTENDANCE_STATUS } from "@/types/attendance.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

type Props = {
  children: React.ReactNode;
};

const schema = z
  .object({
    sessionId: z.preprocess(
      (val) => (val === null || val === "" ? undefined : Number(val)),
      z.number({ error: "등록하고자 하는 세션을 선택해주세요" }),
    ),
    memberId: z.preprocess(
      (val) => (val === null || val === "" ? undefined : Number(val)),
      z.number({ error: "등록/수정하고자 하는 회원을 선택해주세요" }),
    ),
    status: z.enum(ATTENDANCE_STATUS, { error: "출결 상태를 선택해주세요" }),
    lateMinutes: z.number({ error: "" }).min(0, { error: "" }).optional(),
    reason: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.status === ATTENDANCE_STATUS.LATE &&
      (data.lateMinutes === undefined || data.lateMinutes < 0)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "",
        path: ["lateMinutes"],
      });
    }
  });

export type AttendanceFormInputType = z.input<typeof schema>;
export type AttendanceFormOutputType = z.output<typeof schema>;

const defaultValues: AttendanceFormInputType = {
  sessionId: "",
  memberId: "",
  status: "PRESENT",
  lateMinutes: 0,
  reason: "",
};

export default function AttendanceFormProvider({ children }: Props) {
  const methods = useForm({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
}
