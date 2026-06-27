import { QuickRecommendClient } from "@/components/QuickRecommendClient";
import { PageHeader } from "@/components/ui";

export default function QuickRecommendPage() {
  return (
    <>
      <PageHeader
        eyebrow="1.2 Quick Tags / 标签快速推荐"
        title="Tap tags to build a quick local reading list"
        subtitle="Mobile-friendly tags for a low-friction recommendation flow. 移动端横向滑动标签，快速生成书单。"
      />
      <QuickRecommendClient />
    </>
  );
}
