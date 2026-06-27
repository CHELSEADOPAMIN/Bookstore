"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { coffees } from "@/data/mock";
import { currency } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { Panel } from "@/components/ui";
import { LocalizedText, T } from "@/components/I18nText";

const ice = [
  { en: "Light ice", zh: "少冰" },
  { en: "Regular ice", zh: "正常冰" },
  { en: "No ice", zh: "去冰" },
];
const sugar = [
  { en: "No sugar", zh: "无糖" },
  { en: "Half sugar", zh: "半糖" },
  { en: "Standard", zh: "标准甜" },
];
const milk = [
  { en: "Dairy", zh: "鲜奶" },
  { en: "Oat", zh: "燕麦奶" },
  { en: "Coconut", zh: "厚椰乳" },
];

export function CafeOrderClient() {
  const [coffee, setCoffee] = useState(coffees[0].id);
  const [selectedIce, setIce] = useState(ice[1].en);
  const [selectedSugar, setSugar] = useState(sugar[1].en);
  const [selectedMilk, setMilk] = useState(milk[0].en);
  const { cart, addCoffee, removeItem, clearCart } = useAppStore();
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

  const add = () => addCoffee(coffee, `${selectedIce} / ${selectedSugar} / ${selectedMilk}`);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <Panel className="space-y-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b64f34]">custom order</p>
          <h2 className="mt-1 font-serif text-3xl font-black">
            <T en="Tune coffee like a reading pace" zh="像调阅读节奏一样调咖啡" />
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {coffees.map((item) => (
            <button
              key={item.id}
              onClick={() => setCoffee(item.id)}
              className={`rounded-lg border p-4 text-left transition ${
                coffee === item.id
                  ? "border-[#15231d] bg-[#15231d] text-[#f5f0e5]"
                  : "border-[#15231d]/10 bg-white/55 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-xl font-black"><LocalizedText value={item.name} /></h3>
                <span className="font-black">{currency(item.price)}</span>
              </div>
              <p className={`mt-2 text-sm ${coffee === item.id ? "text-[#e9ddc8]" : "text-[#66746b]"}`}>
                <LocalizedText value={item.note} />
              </p>
            </button>
          ))}
        </div>

        <Option label={<T en="Ice" zh="冰量" />} values={ice} value={selectedIce} onChange={setIce} />
        <Option label={<T en="Sweetness" zh="甜度" />} values={sugar} value={selectedSugar} onChange={setSugar} />
        <Option label={<T en="Milk" zh="奶基" />} values={milk} value={selectedMilk} onChange={setMilk} />

        <button
          onClick={add}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#b64f34] px-5 font-black text-white shadow-xl shadow-[#b64f34]/20 sm:w-auto"
        >
          <Plus size={18} />
          <T en="Add to Order" zh="加入订单" />
        </button>
      </Panel>

      <Panel className="h-fit">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-black"><T en="Current Order" zh="当前订单" /></h2>
          <ShoppingBag size={20} />
        </div>
        <div className="space-y-3">
          {cart.length === 0 ? (
            <p className="rounded-xl bg-white/60 p-4 text-sm text-[#66746b]">
              <T en="No drinks yet. Choose one from the left." zh="还没有饮品，先选择一杯。" />
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="rounded-xl bg-white/60 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black"><LocalizedText value={item.name} /> × {item.qty}</p>
                    <p className="mt-1 text-xs text-[#66746b]">{item.options}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="grid size-8 place-items-center rounded-full bg-[#15231d]/8" aria-label="删除">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-[#15231d]/10 pt-4">
          <span className="text-sm text-[#66746b]"><T en="Total" zh="合计" /></span>
          <span className="font-serif text-3xl font-black">{currency(total)}</span>
        </div>
        <button
          onClick={clearCart}
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#15231d] px-5 font-bold text-[#f5f0e5]"
        >
          <Minus size={16} />
          <T en="Submit Demo" zh="模拟提交" />
        </button>
      </Panel>
    </div>
  );
}

function Option({
  label,
  values,
  value,
  onChange,
}: {
  label: React.ReactNode;
  values: Array<{ en: string; zh: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-black text-[#314038]">{label}</p>
      <div className="grid grid-cols-3 gap-2">
        {values.map((item) => (
          <button
            key={item.en}
            onClick={() => onChange(item.en)}
            className={`h-11 rounded-full border text-sm font-bold ${
              item.en === value
                ? "border-[#2c8a8a] bg-[#2c8a8a] text-white"
                : "border-[#15231d]/10 bg-white/55 text-[#314038]"
            }`}
          >
            <T en={item.en} zh={item.zh} />
          </button>
        ))}
      </div>
    </div>
  );
}
