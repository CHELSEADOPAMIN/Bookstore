"use client";

import { useMemo, useState } from "react";
import { Filter, RotateCcw } from "lucide-react";
import { books } from "@/data/mock";
import { BookCard } from "@/components/BookCard";
import { useLanguage } from "@/lib/useLanguage";

type Book = (typeof books)[number];

const searchableBookText = (book: Book) =>
  [book.title, book.author, book.mood, book.desc, ...book.tags].join(" ").toLowerCase();

const hasAnyTerm = (book: Book, terms: string[]) => {
  const text = searchableBookText(book);
  return terms.some((term) => text.includes(term));
};

const categories = [
  {
    id: "all",
    label: { en: "All", zh: "全部" },
    description: { en: "Show every recommended title.", zh: "显示全部推荐书。" },
    match: () => true,
  },
  {
    id: "adult",
    label: { en: "25-44 Adult Picks", zh: "25-44 成人精选" },
    description: { en: "Most of the shelf: contemporary fiction, career growth, relationships, and identity.", zh: "书架主体：当代小说、职业成长、情感关系和身份议题。" },
    match: (book: Book) =>
      hasAnyTerm(book, ["25-44", "professional", "relationship", "work life", "identity"]),
  },
  {
    id: "children",
    label: { en: "Kids", zh: "儿童读物" },
    description: { en: "Child-friendly classics and family reading choices.", zh: "适合小孩阅读或亲子共读的经典与轻松读物。" },
    match: (book: Book) =>
      hasAnyTerm(book, ["children", "kid", "family read", "middle grade", "picture book"]),
  },
  {
    id: "senior",
    label: { en: "Older Readers", zh: "长辈阅读" },
    description: { en: "Clear plots, warmer pacing, memoirs, and cosy mysteries for older readers.", zh: "故事清楚、节奏更舒适，适合长辈慢慢读。" },
    match: (book: Book) =>
      hasAnyTerm(book, ["senior friendly", "older readers", "large-print friendly", "gentle pace", "cosy", "cozy"]),
  },
  {
    id: "languages",
    label: { en: "World Languages", zh: "多语种展示" },
    description: { en: "A small showcase of Chinese, French, Japanese, and Spanish titles.", zh: "少量展示中文、法语、日语和西语书。" },
    match: (book: Book) =>
      hasAnyTerm(book, ["language showcase", "chinese language", "french language", "japanese language", "spanish language"]),
  },
  {
    id: "australian",
    label: { en: "Australian", zh: "澳洲本地" },
    description: { en: "Local authors, settings, or Australian context.", zh: "澳洲作者、背景或本地语境。" },
    match: (book: Book) =>
      hasAnyTerm(book, ["australia", "australian", "brisbane", "local"]),
  },
  {
    id: "fast",
    label: { en: "Fast Read", zh: "周末快读" },
    description: { en: "Strong pace, weekend-friendly picks.", zh: "节奏快，适合周末读完。" },
    match: (book: Book) =>
      hasAnyTerm(book, ["fast"]) ||
      book.title === "The Dry",
  },
  {
    id: "chinese",
    label: { en: "Chinese Literature", zh: "中文书" },
    description: { en: "Original Chinese titles and Chinese-reader favourites.", zh: "中文原版书与中国读者熟悉的作品。" },
    match: (book: Book) =>
      searchableBookText(book).includes("chinese") ||
      /[\u3400-\u9fff]/.test(book.title),
  },
  {
    id: "bookclub",
    label: { en: "Book Club", zh: "读书会" },
    description: { en: "Easy to discuss with local readers.", zh: "适合本地读书会讨论。" },
    match: (book: Book) =>
      hasAnyTerm(book, ["book club"]) ||
      book.title === "The Dictionary of Lost Words" ||
      book.title === "活着",
  },
  {
    id: "nonfiction",
    label: { en: "Non-fiction", zh: "非虚构" },
    description: { en: "History, place, culture, and ideas.", zh: "历史、地方、文化和观点类阅读。" },
    match: (book: Book) =>
      hasAnyTerm(book, ["non-fiction"]) ||
      book.title === "Dark Emu",
  },
  {
    id: "warm",
    label: { en: "Warm & Emotional", zh: "温暖情感" },
    description: { en: "Gentler novels with emotional pull.", zh: "更温柔、更有情绪牵引的小说。" },
    match: (book: Book) =>
      book.mood.toLowerCase().includes("warm") ||
      book.mood.toLowerCase().includes("emotional"),
  },
];

export function QuickRecommendClient() {
  const [active, setActive] = useState("all");
  const lang = useLanguage();
  const selected = categories.find((category) => category.id === active) ?? categories[0];
  const filteredBooks = useMemo(() => books.filter(selected.match), [selected]);
  const text = (value: { en: string; zh: string }) => value[lang];

  return (
    <>
      <section className="mb-5 rounded-xl border border-[#15231d]/10 bg-[#fffaf0]/78 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-black text-[#b64f34]">
          <Filter size={16} />
          {lang === "en" ? "Recommendation categories" : "推荐分类"}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActive(category.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition ${
                active === category.id
                  ? "bg-[#15231d] text-[#f5f0e5]"
                  : "border border-[#15231d]/10 bg-white/55 text-[#314038] hover:bg-white"
              }`}
            >
              {text(category.label)}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white/55 p-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#66746b]">
              {lang === "en" ? "Current category" : "当前分类"}
            </p>
            <p className="mt-1 font-serif text-2xl font-black">
              {text(selected.label)}
            </p>
            <p className="mt-1 text-sm text-[#66746b]">
              {text(selected.description)}
            </p>
          </div>
          <button
            onClick={() => setActive("all")}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[#15231d]/10 bg-white/70 px-4 text-sm font-black"
          >
            <RotateCcw size={15} />
            {lang === "en" ? "Reset" : "重置"}
          </button>
        </div>
      </section>

      <div className="mb-4 text-sm font-bold text-[#66746b]">
        {lang === "en" ? `${filteredBooks.length} books matched` : `匹配 ${filteredBooks.length} 本书`}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}
