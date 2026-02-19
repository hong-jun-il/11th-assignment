import clsx from "clsx";
import Nav from "./_components/Nav";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className={clsx("flex", "h-full w-full")}>
      <Nav />
      <main className={clsx("flex-1 bg-amber-50", "px-3 py-8")}>
        {children}
      </main>
    </div>
  );
}
