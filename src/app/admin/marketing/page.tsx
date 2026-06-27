import { Megaphone, Send, TicketPercent } from "lucide-react";
import { LocalizedText } from "@/components/I18nText";
import { PageHeader, Panel } from "@/components/ui";

const campaigns = [
  ["Rainy Day Reading / 雨天阅读券", "Push a book + coffee bundle to nearby members on rainy days. 下雨时向附近会员推送组合券。", "Draft / 准备中"],
  ["New Release Alert / 新书提醒", "Notify customers who saved related tags. 对收藏相关标签的会员发送通知。", "Live / 运行中"],
  ["Weekend Event Recall / 周末活动召回", "Offer salon discounts to inactive event members. 对未参加活动会员发放折扣。", "Paused / 暂停"],
];

export default function MarketingPage() {
  return (
    <>
      <PageHeader eyebrow="6.3 Marketing / 营销管理" title="Simplified campaign management" />
      <div className="grid gap-4 lg:grid-cols-3">
        {campaigns.map(([title, text, status]) => (
          <Panel key={title}>
            <span className="grid size-12 place-items-center rounded-full bg-[#d9a441]/25 text-[#b64f34]">
              {status.startsWith("Live") ? <Send size={20} /> : status.startsWith("Paused") ? <TicketPercent size={20} /> : <Megaphone size={20} />}
            </span>
            <h2 className="mt-5 font-serif text-2xl font-black"><LocalizedText value={title} /></h2>
            <p className="mt-3 text-sm leading-6 text-[#66746b]"><LocalizedText value={text} /></p>
            <p className="mt-5 rounded-full bg-white/60 px-3 py-2 text-sm font-black text-[#2f5f4f]"><LocalizedText value={status} /></p>
          </Panel>
        ))}
      </div>
    </>
  );
}
