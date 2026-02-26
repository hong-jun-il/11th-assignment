"use client";

import AttendanceFormProvider, {
  AttendanceFormInputType,
  AttendanceFormOutputType,
} from "../../_components/AttendanceFormProvider";
import clsx from "clsx";
import LoadingComponent from "@/components/ui/LoadingComponent";
import AsyncBoundary from "@/components/AsyncBoundary";
import { useAttendanceModal } from "../../_components/AttendanceModalProvider";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import RHFSelect from "@/components/ui/RHF/RHFSelect";
import { OptionType } from "@/components/ui/Select";
import {
  ATTENDANCE_STATUS,
  AttendanceStatusType,
} from "@/types/attendance.type";
import { ATTENDANCE_STATUS_MATCHER } from "@/utils/matcher";
import Button from "@/components/ui/Button";
import { useGetMembers, useGetSessions } from "@/hooks/queries";
import { formatKorDate } from "@/utils/formatDate";
import RHFComboBox from "@/components/ui/RHF/RHFComboBox";
import { useCreateAttendance, useUpdateAttendance } from "@/hooks/mutations";

function SessionSelect({
  setSelectedSessionDate,
}: {
  setSelectedSessionDate: Dispatch<SetStateAction<string | null>>;
}) {
  const { data } = useGetSessions();

  const sessions = data.data ?? [];

  const sessionOptions: OptionType<number>[] = sessions.map((session) => ({
    value: session.id,
    label: session.title,
  }));

  const rawSessionId = useWatch({ name: "sessionId" });
  const selectedSessionId = rawSessionId ? Number(rawSessionId) : null;

  useEffect(() => {
    const targetSession = sessions.find(
      (session) => session.id === selectedSessionId,
    );

    if (targetSession) {
      setSelectedSessionDate(formatKorDate(targetSession.date));
    }
  }, [selectedSessionId, setSelectedSessionDate]);

  return (
    <RHFSelect<AttendanceFormInputType, number>
      id="sessionId"
      name="sessionId"
      options={sessionOptions}
    />
  );
}

function MemberSelect() {
  const { data } = useGetMembers({ size: 100000 });

  const members = data.data?.content || [];
  const memberOptions: OptionType<number>[] = members.map((member) => ({
    value: member.id,
    label: member.name,
  }));

  return (
    <div
      className={clsx(
        "flex items-center justify-between whitespace-nowrap",
        "mb-5",
      )}
    >
      <h3 className="font-semibold whitespace-normal">멤버</h3>
      <RHFSelect<AttendanceFormInputType, number>
        id="memberId"
        name="memberId"
        options={memberOptions}
        className="w-fit!"
      />
    </div>
  );
}

function AttendanceForm() {
  const { selectedData, closeModal } = useAttendanceModal();
  const { reset, setValue, handleSubmit } =
    useFormContext<AttendanceFormInputType>();
  const [selectedSessionDate, setSelectedSessionDate] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (selectedData) {
      reset({
        status: selectedData.status,
        memberId: selectedData.memberId,
        sessionId: selectedData.sessionId,
        lateMinutes: selectedData.lateMinutes || 0,
        reason: selectedData.reason || "",
      });
    }
  }, [selectedData]);

  const statusOptions: OptionType<AttendanceStatusType>[] = [
    {
      value: ATTENDANCE_STATUS.PRESENT,
      label: ATTENDANCE_STATUS_MATCHER[ATTENDANCE_STATUS.PRESENT],
    },
    {
      value: ATTENDANCE_STATUS.ABSENT,
      label: ATTENDANCE_STATUS_MATCHER[ATTENDANCE_STATUS.ABSENT],
    },
    {
      value: ATTENDANCE_STATUS.EXCUSED,
      label: ATTENDANCE_STATUS_MATCHER[ATTENDANCE_STATUS.EXCUSED],
    },
    {
      value: ATTENDANCE_STATUS.LATE,
      label: ATTENDANCE_STATUS_MATCHER[ATTENDANCE_STATUS.LATE],
    },
  ];

  const lateMinOptions: OptionType<number>[] = Array.from(
    { length: 60 / 5 },
    (_, i) => {
      const val = (i + 1) * 5;

      return { label: `${val}분`, value: val };
    },
  );

  const reasonOptions: OptionType<string>[] = [
    { value: "경조사", label: "경조사" },
    { value: "병가", label: "병가" },
    { value: "공계", label: "공계" },
    { value: "시험", label: "시험 및 과제 일정" },
    { value: "교통", label: "교통 지연" },
    { value: "면접", label: "취업 및 인턴 면접" },
    { value: "개인사정", label: "기타 개인 사정" },
  ];

  const statusValue = useWatch({
    name: "status",
  });

  useEffect(() => {
    if (statusValue !== ATTENDANCE_STATUS.LATE) {
      setValue("lateMinutes", 0);
    }
  }, [statusValue]);

  const { mutate: createMutate } = useCreateAttendance();
  const { mutate: updateMutate } = useUpdateAttendance();

  const onSubmit = (data: AttendanceFormInputType) => {
    const formattedData: AttendanceFormOutputType = {
      ...data,
      sessionId: Number(data.sessionId),
      memberId: Number(data.memberId),
    };

    if (selectedData) {
      updateMutate(formattedData);
    } else {
      createMutate(formattedData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        "w-1/4 min-w-[400px]",
        "space-y-5 px-5 py-5",
        "rounded-lg bg-white",
      )}
    >
      <h2 className={clsx("text-xl")}>
        {selectedData ? "출결 정보 수정" : "출결 정보 등록"}
      </h2>
      <div className={clsx("px-3")}>
        <div
          className={clsx(
            "flex items-center justify-between whitespace-nowrap",
            "mb-3",
          )}
        >
          <h3 className="font-semibold">세션</h3>
          {selectedData ? (
            <span>{selectedData.sessionTitle}</span>
          ) : (
            <SessionSelect setSelectedSessionDate={setSelectedSessionDate} />
          )}
        </div>

        <div
          className={clsx(
            "flex items-center justify-between whitespace-nowrap",
            "mb-3",
          )}
        >
          <h3 className="font-semibold whitespace-normal">날짜</h3>
          <span className="inline-block whitespace-normal">
            {selectedData
              ? formatKorDate(selectedData.createdAt.split("T")[0])
              : selectedSessionDate}
          </span>
        </div>

        {!selectedData && <MemberSelect />}

        <div className={clsx("mb-3 flex items-end gap-3")}>
          <RHFSelect<AttendanceFormInputType, AttendanceStatusType>
            options={statusOptions}
            id="status"
            name="status"
            label="출결 현황"
            className="w-fit!"
          />
          {statusValue && statusValue === ATTENDANCE_STATUS.LATE && (
            <RHFComboBox<AttendanceFormInputType, number>
              options={lateMinOptions}
              name="lateMinutes"
              id="lateMinutes"
              type="number"
              onBlur={(e) => {
                if (
                  (!isNaN(+e.target.value) && Number(e.target.value) < 0) ||
                  !!e.target.value === false
                ) {
                  alert("지각(분)은 0 이상의 숫자만 입력해주세요");
                  setValue("lateMinutes", 0);
                }
              }}
            />
          )}
        </div>

        {statusValue && statusValue !== ATTENDANCE_STATUS.PRESENT && (
          <RHFComboBox<AttendanceFormInputType, string>
            options={reasonOptions}
            id="reason"
            name="reason"
            label="사유"
          />
        )}
      </div>

      <div className={clsx("flex justify-end gap-3")}>
        <Button text="등록" type="submit" />
        <Button
          text="취소"
          onClick={closeModal}
          className="bg-gray-300 text-black!"
        />
      </div>
    </form>
  );
}

export default function AttendanceModal() {
  const { isOpen } = useAttendanceModal();

  if (!isOpen) return null;

  return (
    <AttendanceFormProvider>
      <div
        className={clsx(
          "fixed inset-0",
          "flex h-full w-full items-center justify-center",
          "bg-black/40",
        )}
      >
        <AsyncBoundary pendingFallback={<LoadingComponent />}>
          <AttendanceForm />
        </AsyncBoundary>
      </div>
    </AttendanceFormProvider>
  );
}
