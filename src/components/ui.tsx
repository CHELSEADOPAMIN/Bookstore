import { LocalizedText } from "@/components/I18nText";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: { href: string; label: React.ReactNode };
};

export function PageHeader(props: PageHeaderProps) {
  void props;
  return null;
}

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-[#15231d]/10 bg-[#fffaf0]/78 p-4 shadow-sm", className)}>
      {children}
    </div>
  );
}

export function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full border border-[#15231d]/10 bg-white/55 px-4 py-2">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#66746b]">
        <LocalizedText value={label} />
      </p>
      <p className="text-lg font-black text-[#15231d]">{value}</p>
    </div>
  );
}
