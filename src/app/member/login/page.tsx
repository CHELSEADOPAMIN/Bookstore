import { LoginClient } from "@/components/LoginClient";
import { PageHeader } from "@/components/ui";

export default function LoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="2.1 Member Sign In / 会员登录"
        title="LocalStorage member login for the demo"
        subtitle="Enter a name and phone to create a local member state. 输入昵称和手机号即可写入本地会员状态。"
      />
      <LoginClient />
    </>
  );
}
