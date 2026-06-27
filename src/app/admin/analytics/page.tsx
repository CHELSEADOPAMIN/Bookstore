import { DashboardCharts } from "@/components/DashboardCharts";
import { LocalizedText } from "@/components/I18nText";
import { PageHeader, Panel } from "@/components/ui";

export const dynamic = "force-dynamic";

const insights = [
  ["AI Conversion / AI 转化", "38%", "AI chat users are more likely to buy recommended fiction. 聊天推荐页转化更高。"],
  ["Coffee Attach Rate / 咖啡联购率", "52%", "More than half of cafe customers view book cards. 点单用户中超过一半浏览书籍卡片。"],
  ["Event Return Rate / 活动复访", "2.4x", "Event attendees visit more often each month. 参加活动的会员复访更高。"],
];

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader eyebrow="6.4 Analytics / 数据分析" title="Key metrics and trend analysis" />
      <div className="mb-5 grid gap-4 md:grid-cols-3">
        {insights.map(([label, value, text]) => (
          <Panel key={label}>
            <p className="text-sm font-black text-[#b64f34]"><LocalizedText value={label} /></p>
            <p className="mt-2 font-serif text-5xl font-black">{value}</p>
            <p className="mt-3 text-sm leading-6 text-[#66746b]"><LocalizedText value={text} /></p>
          </Panel>
        ))}
      </div>
      <DashboardCharts />
    </>
  );
}
