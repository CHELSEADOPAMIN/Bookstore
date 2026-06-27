import Link from "next/link";
import { CalendarDays, UsersRound } from "lucide-react";
import { events } from "@/data/mock";
import { LocalizedText, T } from "@/components/I18nText";
import { PageHeader } from "@/components/ui";

export default function EventsPage() {
  return (
    <>
      <PageHeader eyebrow="5.1 Events / 活动列表" title="Local events presented like an editorial calendar" />
      <div className="grid gap-5 lg:grid-cols-3">
        {events.map((event) => (
          <Link key={event.id} href={`/community/events/${event.id}`} className="overflow-hidden rounded-xl border border-[#15231d]/10 bg-[#fffaf0]/78 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <img src={event.image} alt={event.title} className="h-52 w-full object-cover" />
            <div className="p-5">
              <h2 className="font-serif text-2xl font-black leading-tight"><LocalizedText value={event.title} /></h2>
              <p className="mt-3 text-sm leading-6 text-[#66746b]"><LocalizedText value={event.intro} /></p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-[#314038]">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-2"><CalendarDays size={14} /><LocalizedText value={event.date} /></span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-2"><UsersRound size={14} /><T en={`${event.seats} seats left`} zh={`剩 ${event.seats} 位`} /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
