"use client";

import Link from "next/link";
import { Crown, Sparkles } from "lucide-react";
import { T } from "@/components/I18nText";
import { useAppStore } from "@/store/useAppStore";

export function MemberSummary() {
  const member = useAppStore((state) => state.member);

  if (!member) {
    return (
      <div className="rounded-xl border border-[#15231d]/10 bg-[#fffaf0]/78 p-5">
        <p className="text-[#66746b]"><T en="Sign in to see points, benefits and recent orders." zh="登录后可查看积分、权益和最近订单。" /></p>
        <Link href="/member/login" className="mt-4 inline-flex h-11 items-center rounded-full bg-[#15231d] px-5 font-bold text-[#f5f0e5]">
          <T en="Sign In" zh="登录" />
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#15231d] p-6 text-[#f5f0e5]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#d9a441]"><T en="Collector Member" zh="藏书家会员" /></p>
          <h2 className="mt-1 font-serif text-4xl font-black">{member.name}</h2>
        </div>
        <span className="grid size-12 place-items-center rounded-full bg-[#d9a441] text-[#15231d]">
          <Crown size={22} />
        </span>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { key: "points", label: <T en="Points" zh="积分" />, value: `${member.points}` },
          { key: "discount", label: <T en="Discount" zh="折扣" />, value: "8%" },
          { key: "perks", label: <T en="Perks" zh="权益" />, value: "5" },
        ].map((item) => (
          <div key={item.key} className="rounded-lg bg-white/10 p-3">
            <p className="text-xs text-[#e9ddc8]">{item.label}</p>
            <p className="mt-1 text-2xl font-black">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-lg bg-white/10 p-3 text-sm text-[#e9ddc8]">
        <Sparkles size={16} />
        <T en="Spend $18 more this month to unlock a buy-one-get-one coffee voucher." zh="本月再消费 $18 可获得咖啡券。" />
      </div>
    </div>
  );
}
