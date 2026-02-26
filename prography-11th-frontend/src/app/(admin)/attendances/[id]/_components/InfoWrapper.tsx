import clsx from "clsx";
import InfoItem, { InfoItemType } from "./InfoItem";

type Props = {
  title: string;
  items: InfoItemType[];
};

export default function InfoWrapper({ title, items }: Props) {
  return (
    <div className={clsx("space-y-3")}>
      <h4 className="px-3 font-semibold text-gray-800">{title}</h4>
      <div
        className={clsx(
          "grid grid-cols-2 gap-x-12 gap-y-4",
          "p-8",
          "rounded-xl",
          "bg-gray-100",
        )}
      >
        {items.map(({ value, label }, i) => (
          <InfoItem key={i} value={value} label={label} />
        ))}
      </div>
    </div>
  );
}
