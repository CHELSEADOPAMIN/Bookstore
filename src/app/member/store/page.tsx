import { Gift } from "lucide-react";
import { LocalizedText } from "@/components/I18nText";
import { PageHeader, Panel } from "@/components/ui";

const rewards = [
  ["Any Coffee Voucher / 任意咖啡券", "600 pts / 积分", "Valid for 7 days / 7 天有效"],
  ["$10 Book Credit / 图书抵扣", "900 pts / 积分", "Min spend $40 / 满 $40 可用"],
  ["Night Reading Seat / 夜读名额", "1200 pts / 积分", "Friday events only / 限周五"],
  ["Canvas Tote / 帆布袋", "1800 pts / 积分", "Pick up in store / 门店自提"],
];

export default function MemberStorePage() {
  return (
    <>
      <PageHeader eyebrow="2.3 Rewards Store / 积分商城" title="Static rewards shelf" subtitle="Keeps reward content and redemption CTAs for prototype display. 原型阶段展示兑换入口和商品信息。" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {rewards.map(([name, points, desc]) => (
          <Panel key={name}>
            <span className="grid size-12 place-items-center rounded-full bg-[#d9a441]/25 text-[#b64f34]"><Gift size={21} /></span>
            <h2 className="mt-5 font-serif text-2xl font-black"><LocalizedText value={name} /></h2>
            <p className="mt-2 text-lg font-black text-[#b64f34]"><LocalizedText value={points} /></p>
            <p className="mt-2 text-sm text-[#66746b]"><LocalizedText value={desc} /></p>
          </Panel>
        ))}
      </div>
    </>
  );
}
