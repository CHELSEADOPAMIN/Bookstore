import Link from "next/link";
import { CalendarDays, Facebook, Instagram, Linkedin, UsersRound, Youtube } from "lucide-react";
import { events } from "@/data/mock";
import { LocalizedText, T } from "@/components/I18nText";
import { PageHeader } from "@/components/ui";

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/", icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
  { name: "YouTube", href: "https://www.youtube.com/", icon: Youtube },
  { name: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin },
];

export default function EventsPage() {
  return (
    <>
      <PageHeader eyebrow="5.1 Events / 活动列表" title="Local events presented like an editorial calendar" />
      <section className="mb-5 flex flex-col gap-4 rounded-xl border border-[#15231d]/10 bg-[#fffaf0]/78 p-5 shadow-sm shadow-[#15231d]/5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#b64f34]">
            <T en="Follow events" zh="关注活动" />
          </p>
          <p className="mt-1 font-serif text-2xl font-black leading-tight text-[#15231d]">
            <T en="Join the community online" zh="线上加入社区" />
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                title={item.name}
                className="grid size-11 place-items-center rounded-full border border-[#15231d]/12 bg-white/70 text-[#314038] transition hover:-translate-y-0.5 hover:border-[#15231d] hover:bg-[#15231d] hover:text-[#f5f0e5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b64f34]"
              >
                <Icon size={19} />
              </a>
            );
          })}
        </div>
      </section>
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
