import clsx from "clsx";

export type InfoItemType = {
  label: string;
  value: string | number;
};

export default function InfoItem({ label, value }: InfoItemType) {
  return (
    <div className="flex items-center gap-4 py-1">
      <span
        className={clsx("w-24", "shrink-0", "text-sm font-bold text-gray-900")}
      >
        {label}
      </span>
      <span className="text-sm text-gray-600">{value}</span>
    </div>
  );
}
