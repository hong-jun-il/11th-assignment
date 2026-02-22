import clsx from "clsx";
import Nav from "./_components/Nav";
import PageHeader from "./_components/PageHeader";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className={clsx("flex", "h-full w-full")}>
      <Nav />
      <main className={clsx("flex flex-1 flex-col", "px-3 py-8")}>
        <PageHeader />
        {children}
      </main>
    </div>
  );
}
