"use client";

import Button from "@/components/ui/Button";
import DateInput from "@/components/ui/DateInput";
import { OptionType, Select } from "@/components/ui/Select";
import useSelectDateRange from "@/hooks/useSelectDateRange";
import { formatLocalDate } from "@/utils/formatDate";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export type DateSearchType = "registeredAt";

const searchOptions: OptionType<DateSearchType>[] = [
  {
    value: "registeredAt",
    label: "등록일",
  },
];

export default function AttendanceSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const optionRef = useRef<HTMLSelectElement>(null);

  const selectDefaultValue: DateSearchType = (searchParams.get(
    "dateSearchType",
  ) || "registeredAt") as DateSearchType;

  const {
    startDate,
    endDate,
    dates,
    updateRange,
    handleStartDateChange,
    handleEndDateChange,
  } = useSelectDateRange();

  const quickSelectBtns = [
    {
      label: "오늘",
      action: () => {
        updateRange(dates.now, dates.now);
      },
      isActive:
        formatLocalDate(dates.now) === startDate && startDate === endDate,
    },
    {
      label: "30일",
      action: () => {
        updateRange(dates.monthAgo, dates.now);
      },
      isActive:
        formatLocalDate(dates.monthAgo) === startDate &&
        formatLocalDate(dates.now) === endDate,
    },
    {
      label: "1년",
      action: () => {
        updateRange(dates.yearAgo, dates.now);
      },
      isActive:
        formatLocalDate(dates.yearAgo) === startDate &&
        formatLocalDate(dates.now) === endDate,
    },
  ];

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!optionRef.current) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    params.set("page", "1");
    params.set("dateSearchType", optionRef.current.value);
    params.set("start", startDate);
    params.set("end", endDate);

    router.push(`?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={clsx(
        "w-full",
        "flex items-center justify-between",
        "mb-5 px-8",
      )}
    >
      <div className={clsx("flex w-1/2 items-center gap-3")}>
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
          id="dateSearchType"
          name="dateSearchType"
          options={searchOptions}
          className="max-w-fit!"
          defaultValue={selectDefaultValue}
        />
        <DateInput
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <span>~</span>
        <DateInput
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={handleEndDateChange}
        />

        {quickSelectBtns.map((btn) => (
          <Button
            key={btn.label}
            text={btn.label}
            className={clsx(
              "border",
              "px-4!",
              "bg-white!",
              btn.isActive
                ? "border-blue-400 text-blue-400!"
                : "border-gray-300 text-gray-500!",
            )}
            onClick={btn.action}
          />
        ))}
      </div>

      <Button
        type="submit"
        text="검색"
        className={clsx(
          "bg-gray-400",
          "transition-colors duration-200 hover:bg-black",
        )}
      />
    </form>
  );
}
