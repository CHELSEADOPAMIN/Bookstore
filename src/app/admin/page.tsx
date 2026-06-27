import { DashboardCharts } from "@/components/DashboardCharts";
import { dashboardCards } from "@/data/mock";
import { LocalizedText } from "@/components/I18nText";
import { PageHeader } from "@/components/ui";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <>
      <PageHeader eyebrow="6.1 Dashboard" title="Bookstore cafe operations dashboard" subtitle="Recharts displays demo sales, orders and members." />
      <div className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <section key={card.label} className="rounded-xl border border-[#15231d]/10 bg-[#fffaf0]/78 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-[#66746b]"><LocalizedText value={card.label} /></p>
                <Icon className="text-[#b64f34]" size={20} />
              </div>
              <p className="mt-4 font-serif text-4xl font-black">{card.value}</p>
              <p className="mt-2 text-sm font-black text-[#2f5f4f]"><LocalizedText value={card.delta} /></p>
            </section>
          );
        })}
      </div>
      <DashboardCharts />
    </>
  );
}
