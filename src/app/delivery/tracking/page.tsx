import { Bike, CheckCircle2, Store, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { T } from "@/components/I18nText";
import { PageHeader, Panel } from "@/components/ui";

const steps: Array<[{ en: string; zh: string }, string, LucideIcon]> = [
  [{ en: "Packed by store", zh: "门店已打包" }, "15:22", Store],
  [{ en: "Courier picked up", zh: "骑手已取件" }, "15:28", Bike],
  [{ en: "1.1km away", zh: "距离你 1.1km" }, "15:36", Truck],
  [{ en: "Estimated arrival", zh: "预计送达" }, "15:49", CheckCircle2],
];

export default function TrackingPage() {
  return (
    <>
      <PageHeader eyebrow="4.3 Tracking / 配送追踪" title="Clear delivery milestones" />
      <Panel>
        <div className="space-y-4">
          {steps.map(([label, time, Icon]) => (
            <div key={label.en} className="grid grid-cols-[48px_1fr_auto] items-center gap-3 rounded-lg bg-white/60 p-3">
              <span className="grid size-12 place-items-center rounded-full bg-[#15231d] text-[#f5f0e5]"><Icon size={18} /></span>
              <p className="font-serif text-xl font-black"><T en={label.en} zh={label.zh} /></p>
              <p className="text-sm font-bold text-[#66746b]">{time}</p>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
