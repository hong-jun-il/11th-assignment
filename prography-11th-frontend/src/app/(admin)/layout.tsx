import clsx from "clsx";
import Nav from "./_components/Nav";
import PageHeader from "./_components/PageHeader";
import AttendanceModalProvider from "./attendances/_components/AttendanceModalProvider";
import AttendanceModal from "./attendances/[id]/_components/Attendance.modal";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className={clsx("flex", "h-full w-full")}>
      <Nav />
      <main className={clsx("flex flex-1 flex-col", "px-3 py-8")}>
        <AttendanceModalProvider>
          <PageHeader />
          {children}
          <AttendanceModal />
        </AttendanceModalProvider>
      </main>
    </div>
  );
}
