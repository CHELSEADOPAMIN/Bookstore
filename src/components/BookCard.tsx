import { BookOpen, Sparkles } from "lucide-react";
import { LocalizedText } from "@/components/I18nText";
import { currency } from "@/lib/utils";
import type { books } from "@/data/mock";

type Book = (typeof books)[number];

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="grid grid-cols-[94px_1fr] gap-4 rounded-lg border border-[#15231d]/10 bg-white/60 p-3 shadow-sm">
      <img
        src={book.cover}
        alt={book.title}
        className="h-32 w-full rounded-xl bg-[#d8d0be] object-cover shadow-md"
      />
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#2f5f4f]/10 px-2 py-1 text-[11px] font-bold text-[#2f5f4f]">
            <Sparkles size={12} />
            <LocalizedText value={book.mood} />
          </span>
        </div>
        <h3 className="font-serif text-xl font-black leading-tight">{book.title}</h3>
        <p className="mt-1 text-sm text-[#66746b]">{book.author}</p>
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#314038]">
          <LocalizedText value={book.desc} />
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-black text-[#b64f34]">{currency(book.price)}</span>
          <button className="grid size-9 place-items-center rounded-full bg-[#15231d] text-[#f5f0e5]" aria-label={`Add ${book.title} / 加入`}>
            <BookOpen size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
