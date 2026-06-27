import { JoinMembershipClient } from "@/components/JoinMembershipClient";
import { PageHeader } from "@/components/ui";

export default function JoinMembershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="2.0 Join Membership / 加入会员"
        title="Buy a membership before member sign in"
        subtitle="Demo payment flow with local member purchase state. 使用本地状态演示会员购买流程。"
      />
      <JoinMembershipClient />
    </>
  );
}
