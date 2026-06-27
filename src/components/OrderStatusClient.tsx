"use client";

import { useEffect, useState } from "react";
import { Check, Coffee, PackageCheck, Timer, Truck } from "lucide-react";
import { T } from "@/components/I18nText";

const steps = [
  { label: { en: "Accepted", zh: "已接单" }, icon: Check },
  { label: { en: "Making coffee", zh: "咖啡制作" }, icon: Coffee },
  { label: { en: "Packing books", zh: "打包书籍" }, icon: PackageCheck },
  { label: { en: "Ready soon", zh: "等待取餐" }, icon: Timer },
  { label: { en: "Out for delivery", zh: "配送中" }, icon: Truck },
];

export function OrderStatusClient() {
  const [active, setActive] = useState(1);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % steps.length), 1600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="rounded-xl border border-[#15231d]/10 bg-[#fffaf0]/78 p-5">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#b64f34]"><T en="Order A103" zh="订单 A103" /></p>
          <h2 className="font-serif text-3xl font-black"><T en="Ready in 14 min" zh="预计 14 分钟" /></h2>
        </div>
        <span className="rounded-full bg-[#2c8a8a]/12 px-4 py-2 text-sm font-black text-[#2c8a8a]">Live</span>
      </div>
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const done = index <= active;
          return (
            <div key={step.label.en} className="grid grid-cols-[48px_1fr] items-center gap-3">
              <span className={`grid size-12 place-items-center rounded-full transition ${done ? "bg-[#15231d] text-[#f5f0e5]" : "bg-white/70 text-[#66746b]"}`}>
                <Icon size={18} />
              </span>
              <div className="h-14 rounded-lg bg-white/60 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-black"><T en={step.label.en} zh={step.label.zh} /></p>
                  <p className="text-xs text-[#66746b]">{done ? <T en="Active" zh="进行中" /> : <T en="Waiting" zh="等待" />}</p>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#15231d]/10">
                  <div className={`h-full rounded-full bg-[#d9a441] transition-all duration-700 ${done ? "w-full" : "w-0"}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
