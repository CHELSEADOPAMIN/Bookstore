import { AiChatClient } from "@/components/AiChatClient";
import { PageHeader } from "@/components/ui";

export default function AiChatPage() {
  return (
    <>
      <PageHeader
        eyebrow="1.1 AI Chat / AI聊天推荐"
        title="Tell us your mood. Get a local book match."
        subtitle="Hardcoded prototype flow with typing state, bilingual prompts, and linked book cards. 模拟对话流，展示推荐逻辑和书籍卡片联动。"
      />
      <AiChatClient />
    </>
  );
}
