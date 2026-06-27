import { notFound } from "next/navigation";
import { CalendarDays, MapPin, UsersRound } from "lucide-react";
import { events } from "@/data/mock";
import { LocalizedText, T } from "@/components/I18nText";
import { PageHeader, Panel } from "@/components/ui";

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = events.find((item) => item.id === id);
  if (!event) notFound();

  return (
    <>
      <PageHeader eyebrow="5.2 Event Detail / 活动详情" title={<LocalizedText value={event.title} />} subtitle={<LocalizedText value={event.intro} />} />
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <img src={event.image} alt={event.title} className="h-[460px] w-full rounded-xl object-cover shadow-xl shadow-[#15231d]/15" />
        <Panel className="space-y-4">
          <Info icon={CalendarDays} label={<T en="Time" zh="时间" />} value={<LocalizedText value={event.date} />} />
          <Info icon={MapPin} label={<T en="Location" zh="地点" />} value={<LocalizedText value={event.place} />} />
          <Info icon={UsersRound} label={<T en="Seats" zh="名额" />} value={<T en={`${event.seats} seats left`} zh={`剩余 ${event.seats} 位`} />} />
          <button className="h-12 w-full rounded-full bg-[#15231d] font-black text-[#f5f0e5]"><T en="Register Demo" zh="模拟报名" /></button>
        </Panel>
      </div>
    </>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof CalendarDays; label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white/60 p-3">
      <span className="grid size-10 place-items-center rounded-full bg-[#d9a441]/25 text-[#b64f34]"><Icon size={17} /></span>
      <div>
        <p className="text-xs text-[#66746b]">{label}</p>
        <p className="font-black">{value}</p>
      </div>
    </div>
  );
}
