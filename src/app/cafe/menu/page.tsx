import { Coffee } from "lucide-react";
import { coffees } from "@/data/mock";
import { LocalizedText } from "@/components/I18nText";
import { currency } from "@/lib/utils";
import { PageHeader } from "@/components/ui";

export default function CafeMenuPage() {
  return (
    <>
      <PageHeader eyebrow="3.1 Cafe Menu / 咖啡菜单" title="Coffee menu with readable flavour notes" action={{ href: "/cafe/order", label: "Order / 下单" }} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {coffees.map((coffee, index) => (
          <article key={coffee.id} className="relative min-h-52 overflow-hidden rounded-xl border border-[#15231d]/10 bg-[#fffaf0]/78 p-5 shadow-sm">
            <span className="absolute right-4 top-4 text-7xl font-black text-[#15231d]/5">{String(index + 1).padStart(2, "0")}</span>
            <Coffee className="text-[#b64f34]" size={26} />
            <h2 className="mt-5 font-serif text-3xl font-black"><LocalizedText value={coffee.name} /></h2>
            <p className="mt-2 text-sm font-bold text-[#2f5f4f]"><LocalizedText value={coffee.roast} /></p>
            <p className="mt-3 text-sm leading-6 text-[#66746b]"><LocalizedText value={coffee.note} /></p>
            <p className="mt-5 font-serif text-3xl font-black text-[#b64f34]">{currency(coffee.price)}</p>
          </article>
        ))}
      </div>
    </>
  );
}
