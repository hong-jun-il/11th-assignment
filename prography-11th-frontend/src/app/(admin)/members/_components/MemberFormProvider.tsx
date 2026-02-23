"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

type Props = {
  children: React.ReactNode;
};

const schema = z.object({
  loginId: z.string().min(1, { error: "아이디를 입력해주세요" }),
  // password: z.string().min(1, { error: "비밀번호를 입력해주세요" }),
  name: z.string().min(1, { error: "이름을 입력해주세요" }),
  phone: z.string().min(1, { error: "전화번호를 입력해주세요" }),
  cohortId: z.coerce.number(),
  partId: z.coerce.number(),
  teamId: z.coerce.number(),
});

export type MemberFormInputType = z.input<typeof schema>;
export type MemberFormOutputType = z.input<typeof schema>;

const defaultValues: MemberFormInputType = {
  loginId: "",
  // password: "",
  name: "",
  phone: "",
  cohortId: 0,
  partId: 0,
  teamId: 0,
};

export default function MemberFormProvider({ children }: Props) {
  const method = useForm({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });

  return <FormProvider {...method}>{children}</FormProvider>;
}
