"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

type Props = {
  children: React.ReactNode;
};

const schema = z.object({
  loginId: z.string().min(1, { error: "아이디를 입력해주세요" }),
  password: z.string().min(1, { error: "비밀번호를 입력해주세요" }),
  name: z.string().min(1, { error: "이름을 입력해주세요" }),
  phone: z
    .string()
    .min(1, { error: "전화번호를 입력해주세요" })
    .regex(/^010-\d{4}-\d{4}$/, {
      message: "010-0000-0000 형식으로 입력해주세요",
    }),
  cohortId: z.preprocess(
    (val) => (val === null || val === "" ? undefined : Number(val)),
    z.number({ error: "기수를 선택해주세요" }),
  ),
  partId: z.preprocess(
    (val) => (val === null || val === "" ? undefined : Number(val)),
    z.number({ error: "파트를 선택해주세요" }),
  ),
  teamId: z.preprocess(
    (val) => (val === null || val === "" ? undefined : Number(val)),
    z.number({ error: "참여팀을 선택해주세요" }),
  ),
});

export type MemberFormInputType = z.input<typeof schema>;
export type MemberFormOutputType = z.output<typeof schema>;

const defaultValues: MemberFormInputType = {
  loginId: "",
  password: "",
  name: "",
  phone: "",
  cohortId: "",
  partId: "",
  teamId: "",
};

export default function MemberFormProvider({ children }: Props) {
  const methods = useForm({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
