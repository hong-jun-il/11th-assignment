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
  cohortId: z.coerce.number({ error: "올바른 기수를 선택해주세요" }),
  partId: z.coerce.number({ error: "올바른 참여팀을 선택해주세요" }),
  teamId: z.coerce.number({ error: "올바른 파트를 선택해주세요" }),
});

export type MemberFormInputType = z.input<typeof schema>;
export type MemberFormOutputType = z.input<typeof schema>;

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
