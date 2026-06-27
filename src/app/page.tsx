import Link from "next/link";
import { ArrowRight, Bot, Coffee, Crown, LayoutDashboard, MapPin, Sparkles } from "lucide-react";
import { books, coffees, events } from "@/data/mock";
import { BookCard } from "@/components/BookCard";
import { LocalizedText, T } from "@/components/I18nText";
import { Panel, StatPill } from "@/components/ui";

const modules = [
  { href: "/ai-recommend/chat", label: { en: "AI Book Match", zh: "AI 推荐" }, icon: Bot, text: { en: "Book + coffee picks by mood and occasion.", zh: "按心情和场景配书配咖啡。" } },
  { href: "/cafe/order", label: { en: "Custom Cafe Order", zh: "自定义点单" }, icon: Coffee, text: { en: "Milk, ice and sweetness controls.", zh: "冰量、甜度、奶基可配置。" } },
  { href: "/member/profile", label: { en: "Member Centre", zh: "会员中心" }, icon: Crown, text: { en: "Points, levels and benefits in one place.", zh: "积分、等级、权益统一展示。" } },
  { href: "/admin", label: { en: "Operations Dashboard", zh: "运营看板" }, icon: LayoutDashboard, text: { en: "Sales, orders and member analytics.", zh: "销售、订单、会员趋势可视化。" } },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="grid min-h-[calc(100vh-7rem)] gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-[#b64f34]">mobile first pwa</p>
          <h1 className="font-serif text-5xl font-black leading-[0.92] tracking-normal text-[#15231d] md:text-7xl">
            Local Books Bookstore
            <span className="block text-[#2f5f4f]">
              <T en="Bookstore Cafe Prototype" zh="书店咖啡原型系统" />
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#66746b]">
            <T
              en="A PWA for local Australian readers: AI book picks, member rewards, cafe ordering, delivery, events, and admin analytics."
              zh="面向澳洲本地顾客的书店咖啡 PWA：AI 推荐、会员积分、咖啡点单、配送、活动和后台分析。"
            />
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/ai-recommend/chat" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#15231d] px-6 font-black text-[#f5f0e5]">
              <T en="Start Demo" zh="开始演示" />
              <ArrowRight size={18} />
            </Link>
            <Link href="/admin" className="inline-flex h-12 items-center gap-2 rounded-full border border-[#15231d]/15 bg-white/50 px-6 font-black">
              <T en="View Dashboard" zh="查看看板" />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <StatPill label="Modules / 模块" value="6" />
            <StatPill label="Core Pages / 核心页面" value="16+" />
            <StatPill label="Data / 数据" value="Mock + Local" />
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=1200&q=80"
            alt="Local bookstore cafe space / 本地书店咖啡空间"
            className="h-[520px] w-full rounded-xl object-cover shadow-2xl shadow-[#15231d]/20"
          />
          <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-[#fffaf0]/90 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-black text-[#b64f34]">
              <Sparkles size={16} />
              <T en="Today's Pairing" zh="今日组合" />
            </div>
            <p className="mt-2 font-serif text-2xl font-black">{books[0].title} + {coffees[0].name}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {modules.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="rounded-xl border border-[#15231d]/10 bg-[#fffaf0]/78 p-5 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="grid size-12 place-items-center rounded-full bg-[#15231d] text-[#f5f0e5]">
                <Icon size={20} />
              </span>
              <h2 className="mt-5 font-serif text-2xl font-black">
                <T en={item.label.en} zh={item.label.zh} />
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#66746b]">
                <T en={item.text.en} zh={item.text.zh} />
              </p>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <div className="grid gap-4 md:grid-cols-2">
          {books.slice(0, 4).map((book) => <BookCard key={book.id} book={book} />)}
        </div>
        <Panel>
          <div className="flex items-center gap-2 text-sm font-black text-[#b64f34]">
            <MapPin size={16} />
            <T en="Community Events" zh="本周活动" />
          </div>
          <div className="mt-4 space-y-3">
            {events.map((event) => (
              <Link key={event.id} href={`/community/events/${event.id}`} className="block rounded-lg bg-white/60 p-3">
                <p className="font-black"><LocalizedText value={event.title} /></p>
                <p className="mt-1 text-sm text-[#66746b]"><LocalizedText value={event.date} /> · <LocalizedText value={event.place} /></p>
              </Link>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}
