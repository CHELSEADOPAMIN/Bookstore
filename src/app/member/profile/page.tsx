import { Gift, TicketPercent, Trophy } from "lucide-react";
import { MemberSummary } from "@/components/MemberSummary";
import { LocalizedText } from "@/components/I18nText";
import { PageHeader, Panel } from "@/components/ui";

const benefits = [
  { label: "Birthday Coffee / 生日咖啡券", icon: Gift, text: "One free drink voucher in birthday month. 生日月自动发放饮品券。" },
  { label: "Early New Releases / 新书优先购", icon: Trophy, text: "24-hour early access for signed copies. 签名版提前预约。" },
  { label: "Event Discount / 活动折扣", icon: TicketPercent, text: "20% off salons and cupping sessions. 沙龙与杯测活动折扣。" },
];

export default function MemberProfilePage() {
  return (
    <>
      <PageHeader eyebrow="2.2 Member Centre / 会员中心" title="Member level, points and benefits" />
      <div className="grid gap-5 lg:grid-cols-[420px_1fr]">
        <MemberSummary />
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Panel key={benefit.label}>
                <Icon className="text-[#b64f34]" size={24} />
                <h2 className="mt-4 font-serif text-2xl font-black"><LocalizedText value={benefit.label} /></h2>
                <p className="mt-2 text-sm leading-6 text-[#66746b]"><LocalizedText value={benefit.text} /></p>
              </Panel>
            );
          })}
        </div>
      </div>
    </>
  );
}
