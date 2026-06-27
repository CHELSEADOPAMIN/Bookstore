import { Bike, MapPin, PackagePlus } from "lucide-react";
import { DeliveryMap } from "@/components/DeliveryMap";
import { T } from "@/components/I18nText";
import { PageHeader, Panel } from "@/components/ui";

export default function DeliveryPage() {
  return (
    <>
      <PageHeader eyebrow="4.1 + 4.2 Delivery / 配送" title="2.6 km local book-and-coffee delivery zone" subtitle="Leaflet map shows the delivery radius and demo order panel. 地图展示配送范围与模拟下单。" />
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <DeliveryMap />
        <Panel className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-[#15231d] text-[#f5f0e5]"><MapPin size={18} /></span>
            <div>
              <h2 className="font-serif text-2xl font-black"><T en="Delivery Address" zh="配送地址" /></h2>
              <p className="mt-1 text-sm text-[#66746b]"><T en="Alexandria, Sydney · near Green Square" zh="悉尼 Alexandria · Green Square 附近" /></p>
            </div>
          </div>
          <div className="rounded-lg bg-white/60 p-4">
            <p className="text-sm font-black text-[#b64f34]"><T en="Delivery Estimate" zh="配送估算" /></p>
            <p className="mt-2 font-serif text-4xl font-black"><T en="23 min" zh="23 分钟" /></p>
            <p className="mt-2 text-sm text-[#66746b]"><T en="Free delivery over $49. Current fee $6." zh="满 $49 免配送费，当前配送费 $6。" /></p>
          </div>
          <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#b64f34] font-black text-white">
            <PackagePlus size={18} />
            <T en="Create Demo Delivery" zh="模拟配送单" />
          </button>
          <div className="flex items-center gap-2 text-sm text-[#66746b]">
            <Bike size={16} />
            <T en="Spill-safe coffee packing and book protection included." zh="支持咖啡防洒和书籍防潮包装。" />
          </div>
        </Panel>
      </div>
    </>
  );
}
