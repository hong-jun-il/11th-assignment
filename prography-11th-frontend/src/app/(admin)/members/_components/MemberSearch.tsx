"use client";

import Button from "@/components/ui/Button";
import { type OptionType, Select } from "@/components/ui/Select";
import { TextInput } from "@/components/ui/TextInput";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitEvent, useRef } from "react";

export type MemberSearchType = "name" | "loginId" | "phone";

const searchOptions: OptionType<MemberSearchType>[] = [
  {
    value: "name",
    label: "사용자명",
  },
  {
    value: "loginId",
    label: "아이디",
  },
  {
    value: "phone",
    label: "핸드폰",
  },
];

export default function MemberSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectDefaultValue: MemberSearchType = (searchParams.get(
    "searchType",
  ) || "name") as MemberSearchType;
  const inputDefaultValue = searchParams.get("searchValue") || "";

  const inputRef = useRef<HTMLInputElement>(null);
  const optionRef = useRef<HTMLSelectElement>(null);

  const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef.current || !optionRef.current) {
      return;
    }

    const searchType = optionRef.current.value;
    const searchValue = inputRef.current.value.trim();

    const params = new URLSearchParams(searchParams);

    params.set("searchType", searchType);
    params.set("page", "1");

    if (searchValue) {
      params.set("searchValue", searchValue);
    } else {
      params.delete("searchValue");
    }

    router.push(`?${params.toString()}`);
  };

  const handleReset = () => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.value = "";

    const params = new URLSearchParams(searchParams);

    params.set("page", "1");
    params.delete("searchValue");

    router.push(`?${params.toString()}`);
  };

  return (
    <form
      className={clsx(
        "w-full",
        "flex items-center justify-between",
        "mb-5 px-8",
      )}
      onSubmit={handleSearch}
    >
      <div className={clsx("flex w-1/2 items-center gap-5")}>
        <h2
          className={clsx(
            "text-md font-black whitespace-nowrap",
            "text-gray-700",
          )}
        >
          검색항목
        </h2>
        <Select
          ref={optionRef}
          id="searchType"
          name="searchType"
          options={searchOptions}
          className="max-w-fit!"
          defaultValue={selectDefaultValue}
        />
        <TextInput
          ref={inputRef}
          id="searchValue"
          name="searchValue"
          placeholder="검색어를 입력하세요"
          defaultValue={inputDefaultValue}
        />
      </div>

      <div className={clsx("flex gap-3")}>
        <Button
          type="submit"
          text="검색"
          className={clsx(
            "bg-gray-400",
            "transition-colors duration-200 hover:bg-black",
          )}
        />
        <Button text="초기화" onClick={handleReset} />
      </div>
    </form>
  );
}
