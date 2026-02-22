import { formatLocalDate } from "@/utils/formatDate";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function useSelectDateRange() {
  const searchParams = useSearchParams();

  const now = new Date();

  const monthAgo = new Date();
  monthAgo.setMonth(now.getMonth() - 1);

  const yearAgo = new Date();
  yearAgo.setFullYear(yearAgo.getFullYear() - 1);

  const [startDate, setStartDate] = useState<string>(
    searchParams.get("start") || formatLocalDate(yearAgo),
  );
  const [endDate, setEndDate] = useState<string>(
    searchParams.get("end") || formatLocalDate(now),
  );

  const updateRange = (start: Date, end: Date) => {
    setStartDate(formatLocalDate(start));
    setEndDate(formatLocalDate(end));
  };

  const handleStartDateChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setStartDate(e.target.value);

    // 날짜 보정 endDate < startDate
    if (new Date(endDate) < new Date(e.target.value)) {
      setEndDate(e.target.value);
    }
  };

  const handleEndDateChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setEndDate(e.target.value);

    // 날짜 보정 endDate < startDate
    if (new Date(e.target.value) < new Date(startDate)) {
      setStartDate(e.target.value);
    }
  };

  return {
    startDate,
    endDate,
    dates: {
      now,
      monthAgo,
      yearAgo,
    },
    updateRange,
    handleStartDateChange,
    handleEndDateChange,
  };
}
