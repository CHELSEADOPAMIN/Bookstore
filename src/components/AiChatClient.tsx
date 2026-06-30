"use client";

import { useEffect, useMemo, useState } from "react";
import { Bot, Send, UserRound } from "lucide-react";
import { books } from "@/data/mock";
import { BookCard } from "@/components/BookCard";
import { T } from "@/components/I18nText";
import { useLanguage } from "@/lib/useLanguage";

type ChatText = { en: string; zh: string };
type Message = { role: "user" | "assistant"; text: string | ChatText };
type PendingReply = { text: string; promptId?: string };

const prompts = [
  {
    id: "warm-australian",
    en: "I want a warm Australian novel",
    zh: "想读温柔的澳洲小说",
    reply: {
      en: "For a warm Australian novel, start with The Dictionary of Lost Words. It feels local, gentle, and easy to recommend to book-club readers. If you want something lighter after that, The Rosie Project keeps the Australian voice but adds more humour.",
      zh: "如果想读温柔的澳洲小说，首选 The Dictionary of Lost Words。它有本地感、语气柔和，也很适合读书会讨论。如果还想轻松一点，可以接着看 The Rosie Project，澳洲语境更轻快幽默。",
    },
  },
  {
    id: "weekend-fast",
    en: "Something fast for the weekend",
    zh: "周末快读",
    reply: {
      en: "For a weekend read, choose The Dry. The pace is direct, the mystery is easy to enter, and the outback setting gives it a strong Australian feel. If you prefer sci-fi momentum, 三体 is the bolder option.",
      zh: "周末快读可以选 The Dry。节奏直接，悬疑线容易进入，澳洲内陆背景也很鲜明。如果想要更宏大的科幻推进感，可以选《三体》。",
    },
  },
  {
    id: "nonfiction-cold-brew",
    en: "Non-fiction to pair with cold brew",
    zh: "冷萃配非虚构",
    reply: {
      en: "Cold brew pairs well with reflective non-fiction, so I would pick Dark Emu first. It gives the customer a strong sense of place and history. For a more personal non-fiction choice, Crying in H Mart brings food, family, and memory into the conversation.",
      zh: "冷萃适合搭配更有思考感的非虚构，所以我会先推荐 Dark Emu。它有很强的地方和历史语境。如果顾客更想读个人叙事，可以推荐 Crying in H Mart，能自然聊到食物、家庭和记忆。",
    },
  },
];

const fallbackReply: ChatText = {
  en: "I would match that with a balanced shortlist: The Dictionary of Lost Words for warmth, The Dry for pace, and Dark Emu for thoughtful non-fiction. Tell me one more detail, such as mood, budget, or coffee order, and I can narrow it further.",
  zh: "我会先给一个均衡书单：The Dictionary of Lost Words 适合温暖阅读，The Dry 适合快节奏，Dark Emu 适合有思考感的非虚构。你再告诉我一个条件，比如心情、预算或咖啡选择，我可以继续缩小范围。",
};

function getReplyForRequest({ text, promptId }: PendingReply): ChatText {
  const promptReply = prompts.find((prompt) => prompt.id === promptId)?.reply;
  if (promptReply) return promptReply;

  const normalized = text.toLowerCase();
  if (normalized.includes("weekend") || normalized.includes("fast") || normalized.includes("周末") || normalized.includes("快读")) {
    return prompts[1].reply;
  }
  if (normalized.includes("cold brew") || normalized.includes("non-fiction") || normalized.includes("冷萃") || normalized.includes("非虚构")) {
    return prompts[2].reply;
  }
  if (normalized.includes("warm") || normalized.includes("australian") || normalized.includes("温柔") || normalized.includes("澳洲")) {
    return prompts[0].reply;
  }

  return fallbackReply;
}

function MessageText({ text }: { text: Message["text"] }) {
  if (typeof text === "string") return <>{text}</>;
  return <T en={text.en} zh={text.zh} />;
}

export function AiChatClient() {
  const [input, setInput] = useState("");
  const [pendingReply, setPendingReply] = useState<PendingReply | null>(null);
  const lang = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: {
        en: "Tell me your mood, time, or coffee order and I will match a book like a bookseller.",
        zh: "告诉我你的心情、阅读时间或咖啡选择，我会像店员一样帮你配书。",
      },
    },
  ]);
  const picks = useMemo(() => books.slice(0, 3), []);
  const typing = pendingReply !== null;

  const send = (text = input, promptId?: string) => {
    if (typing) return;
    if (!text.trim()) return;
    setMessages((items) => [...items, { role: "user", text }]);
    setInput("");
    setPendingReply({ text, promptId });
  };

  useEffect(() => {
    if (!pendingReply) return;
    const timer = window.setTimeout(() => {
      setMessages((items) => [
        ...items,
        {
          role: "assistant",
          text: getReplyForRequest(pendingReply),
        },
      ]);
      setPendingReply(null);
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [pendingReply]);

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
      <section className="overflow-hidden rounded-xl border border-[#15231d]/10 bg-[#15231d] text-[#f5f0e5] shadow-2xl shadow-[#15231d]/18">
        <div className="border-b border-white/10 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d9a441]">hardcoded ai flow</p>
          <h2 className="mt-1 font-serif text-3xl font-black"><T en="AI Bookseller" zh="AI 店员" /></h2>
        </div>
        <div className="h-[56vh] min-h-[440px] space-y-4 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
              {message.role === "assistant" ? (
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#d9a441] text-[#15231d]">
                  <Bot size={17} />
                </span>
              ) : null}
              <p
                className={`max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6 ${
                  message.role === "user" ? "bg-[#b64f34] text-white" : "bg-white/10"
                }`}
              >
                <MessageText text={message.text} />
              </p>
              {message.role === "user" ? (
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10">
                  <UserRound size={17} />
                </span>
              ) : null}
            </div>
          ))}
          {typing ? (
            <div className="flex items-center gap-2 pl-12 text-sm text-[#e9ddc8]">
              <span className="size-2 animate-pulse rounded-full bg-[#d9a441]" />
              <T en="Preparing recommendation..." zh="正在整理推荐..." />
            </div>
          ) : null}
        </div>
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {prompts.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => send(prompt[lang], prompt.id)}
                disabled={typing}
                className="shrink-0 rounded-full border border-white/15 px-3 py-2 text-xs font-bold text-[#f5f0e5] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <T en={prompt.en} zh={prompt.zh} />
              </button>
            ))}
          </div>
          <form
            className="flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              send();
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={typing}
              placeholder="Mood, budget, reading taste"
              className="h-12 min-w-0 flex-1 rounded-full border border-white/10 bg-white/10 px-4 text-sm outline-none placeholder:text-[#e9ddc8]/60 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
              disabled={typing}
              className="grid size-12 place-items-center rounded-full bg-[#d9a441] text-[#15231d] disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="发送"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </section>
      <aside className="space-y-3">
        {picks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </aside>
    </div>
  );
}
