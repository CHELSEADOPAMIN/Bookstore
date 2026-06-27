import { AlertTriangle, BookOpen, Coffee } from "lucide-react";
import { books, coffees } from "@/data/mock";
import { PageHeader, Panel } from "@/components/ui";

export default function InventoryPage() {
  return (
    <>
      <PageHeader eyebrow="6.2 Inventory" title="Books and cafe stock overview" />
      <div className="grid gap-5 xl:grid-cols-2">
        <Panel>
          <div className="mb-4 flex items-center gap-2"><BookOpen size={20} /><h2 className="font-serif text-2xl font-black">Book Stock</h2></div>
          <div className="space-y-2">
            {books.map((book, index) => (
              <Row key={book.id} name={bookTitleById[book.id] ?? englishText(book.title)} stock={`${18 + index * 7} copies`} warning={index === 2} />
            ))}
          </div>
        </Panel>
        <Panel>
          <div className="mb-4 flex items-center gap-2"><Coffee size={20} /><h2 className="font-serif text-2xl font-black">Cafe Supplies</h2></div>
          <div className="space-y-2">
            {coffees.map((coffee, index) => (
              <Row key={coffee.id} name={englishText(coffee.name)} stock={`${4 + index} kg`} warning={index === 0} />
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

const bookTitleById: Record<string, string> = {
  b12: "To Live",
  b13: "The Three-Body Problem",
  b14: "Blossoms",
};

function englishText(value: string) {
  return value.split(" / ")[0];
}

function Row({ name, stock, warning }: { name: string; stock: string; warning?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-white/60 p-3">
      <p className="font-bold">{name}</p>
      <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-black ${warning ? "bg-[#b64f34]/12 text-[#b64f34]" : "bg-[#2f5f4f]/10 text-[#2f5f4f]"}`}>
        {warning ? <AlertTriangle size={14} /> : null}
        {stock}
      </span>
    </div>
  );
}
