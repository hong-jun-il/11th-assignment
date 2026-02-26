"use client";

import { AttendanceType } from "@/types/attendance.type";
import { createContext, ReactNode, useContext, useState } from "react";

type AttendanceModalContextType = {
  isOpen: boolean;
  selectedData: (AttendanceType & { sessionTitle: string }) | null;
  openModal: (data?: AttendanceType & { sessionTitle: string }) => void;
  closeModal: () => void;
};

const AttendanceModalContext = createContext<AttendanceModalContextType | null>(
  null,
);

type Props = {
  children: ReactNode;
};

export default function AttendanceModalProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<
    (AttendanceType & { sessionTitle: string }) | null
  >(null);

  const openModal = (data?: AttendanceType & { sessionTitle: string }) => {
    if (data) {
      setSelectedData(data);
    }

    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedData(null);
  };

  return (
    <AttendanceModalContext.Provider
      value={{ isOpen, selectedData, openModal, closeModal }}
    >
      {children}
    </AttendanceModalContext.Provider>
  );
}

export function useAttendanceModal() {
  const context = useContext(AttendanceModalContext);

  if (!context) {
    throw new Error("Can't find Attendance Moal Context");
  }
  return context;
}
