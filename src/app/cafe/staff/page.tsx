import { Clock3 } from "lucide-react";
import { staffOrders } from "@/data/mock";
import { LocalizedText } from "@/components/I18nText";
import { PageHeader, Panel } from "@/components/ui";

export default function StaffPage() {
  return (
    <>
      <PageHeader eyebrow="3.4 Staff Queue / 店员后台" title="Simple order queue" subtitle="Shows queued, making, courier pending and ready states. 展示待制作、制作中、等待骑手和已完成状态。" />
      <div className="grid gap-4 lg:grid-cols-2">
        {staffOrders.map((order) => (
          <Panel key={order.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black text-[#b64f34]">#{order.id}</p>
                <h2 className="mt-1 font-serif text-2xl font-black">{order.item}</h2>
                <p className="mt-3 rounded-full bg-[#2f5f4f]/10 px-3 py-1 text-sm font-bold text-[#2f5f4f]">
                  <LocalizedText value={order.status} />
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/65 px-3 py-2 text-sm font-black"><Clock3 size={15} /><LocalizedText value={order.eta} /></span>
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}
