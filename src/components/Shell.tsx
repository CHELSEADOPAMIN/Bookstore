"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookMarked, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { navGroups } from "@/data/mock";
import { T } from "@/components/I18nText";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="grain" />
      <header className="sticky top-0 z-40 border-b border-[#15231d]/10 bg-[#f5f0e5]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-[#15231d]/15 bg-white/50 lg:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[#15231d] text-[#f5f0e5]">
              <BookMarked size={20} />
            </span>
            <span>
              <span className="block font-serif text-xl font-black leading-none tracking-normal">
                Local Books Bookstore
              </span>
              <span className="block text-xs text-[#66746b]">
                <T en="Bookstore Cafe PWA" zh="书店咖啡原型" />
              </span>
            </span>
          </Link>
          <div className="ml-auto hidden h-10 w-72 items-center gap-2 rounded-full border border-[#15231d]/12 bg-white/50 px-4 text-sm text-[#66746b] md:flex">
            <Search size={16} />
            <T en="Search books, coffee, events" zh="搜索书、咖啡、活动" />
          </div>
          <LanguageToggle />
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside
          className={cn(
            "fixed inset-x-0 top-16 z-30 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-[#15231d]/10 bg-[#f5f0e5]/96 p-4 shadow-2xl shadow-black/10 backdrop-blur-xl lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-4rem)] lg:border-b-0 lg:border-r lg:bg-transparent lg:shadow-none",
            open ? "block" : "hidden",
          )}
        >
          <nav className="space-y-6">
            {navGroups.map((group) => (
              <div key={group.title.en}>
                <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#66746b]">
                  <T en={group.title.en} zh={group.title.zh} />
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                          active
                            ? "bg-[#15231d] text-[#f5f0e5] shadow-lg shadow-[#15231d]/15"
                            : "text-[#314038] hover:bg-white/60",
                        )}
                      >
                        <Icon size={17} />
                        <T en={item.label.en} zh={item.label.zh} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 px-4 py-5 md:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
