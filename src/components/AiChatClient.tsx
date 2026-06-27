"use client";

import { useEffect, useMemo, useState } from "react";
import { Bot, Send, UserRound } from "lucide-react";
import { books } from "@/data/mock";
import { BookCard } from "@/components/BookCard";
import { T } from "@/components/I18nText";

type Message = { role: "user" | "assistant"; text: string };

const prompts = [
  { en: "I want a warm Australian novel", zh: "想读温柔的澳洲小说" },
  { en: "Something fast for the weekend", zh: "周末快读" },
  { en: "Non-fiction to pair with cold brew", zh: "冷萃配非虚构" },
];

export function AiChatClient() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Tell me your mood, time, or coffee order and I will match a book like a bookseller.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const picks = useMemo(() => books.slice(0, 3), []);

  const send = (text = input) => {
    if (!text.trim()) return;
    setMessages((items) => [...items, { role: "user", text }]);
    setInput("");
    setTyping(true);
  };

  useEffect(() => {
    if (!typing) return;
    const timer = window.setTimeout(() => {
      setMessages((items) => [
        ...items,
        {
          role: "assistant",
          text: "My top pick is The Dictionary of Lost Words: local, warm, and easy to discuss. For a faster weekend read, choose The Dry. Pair it with Cold Brew.",
        },
      ]);
      setTyping(false);
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [typing]);

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
                {message.text}
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
                key={prompt.en}
                onClick={() => send(prompt.en)}
                className="shrink-0 rounded-full border border-white/15 px-3 py-2 text-xs font-bold text-[#f5f0e5]"
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
              placeholder="Mood, budget, reading taste"
              className="h-12 min-w-0 flex-1 rounded-full border border-white/10 bg-white/10 px-4 text-sm outline-none placeholder:text-[#e9ddc8]/60"
            />
            <button className="grid size-12 place-items-center rounded-full bg-[#d9a441] text-[#15231d]" aria-label="发送">
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
