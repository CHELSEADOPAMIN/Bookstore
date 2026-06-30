"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BadgeCheck, Check, CreditCard, Crown, GraduationCap, Smartphone, WalletCards } from "lucide-react";
import { T } from "@/components/I18nText";
import { MEMBERSHIP_PRICE, STUDENT_DISCOUNT_RATE, studentPrice, type MembershipPlan } from "@/lib/membership";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { currency } from "@/lib/utils";

const paymentMethods = [
  { id: "paypal", label: "PayPal", icon: WalletCards },
  { id: "afterpay", label: "Afterpay", icon: BadgeCheck },
  { id: "apple-pay", label: "Apple Pay", icon: Smartphone },
  { id: "visa", label: "Visa", icon: CreditCard },
  { id: "mastercard", label: "Mastercard", icon: CreditCard },
  { id: "amex", label: "American Express", icon: CreditCard },
  { id: "wechat", label: "WeChat Pay", icon: Smartphone },
  { id: "alipay", label: "Alipay", icon: Smartphone },
];

export function JoinMembershipClient() {
  const router = useRouter();
  const purchaseMembership = useAppStore((state) => state.purchaseMembership);
  const membershipPurchased = useAppStore((state) => state.membershipPurchased);
  const membershipPlan = useAppStore((state) => state.membershipPlan);
  const [selectedMethod, setSelectedMethod] = useState("apple-pay");
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan>(membershipPlan);
  const [paid, setPaid] = useState(membershipPurchased);
  const activePrice = selectedPlan === "student" ? studentPrice(MEMBERSHIP_PRICE) : MEMBERSHIP_PRICE;
  const studentSaving = MEMBERSHIP_PRICE - studentPrice(MEMBERSHIP_PRICE);

  function handlePurchase() {
    purchaseMembership(selectedPlan);
    setPaid(true);
    window.setTimeout(() => router.push("/member/login"), 900);
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
      <section className="overflow-hidden rounded-lg border border-[#15231d]/10 bg-[#15231d] text-[#f5f0e5] shadow-sm">
        <div className="grid gap-5 p-5 md:grid-cols-[1fr_220px] md:p-7">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#d9a441]/18 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#d9a441]">
              <Crown size={15} />
              <T en="Collector plan" zh="藏书家会员" />
            </span>
            <h1 className="mt-5 font-serif text-4xl font-black leading-tight md:text-5xl">
              <T en="Join first, then sign in" zh="先加入会员，再登录" />
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#e9ddc8]">
              <T
                en="Demo checkout for the bookstore membership flow. Payment is simulated; after purchase the app sends you to member sign in."
                zh="书店会员流程的模拟结账。付款仅用于演示，购买后会进入会员登录页面。"
              />
            </p>
          </div>
          <div className="rounded-lg bg-[#fffaf0] p-5 text-[#15231d]">
            <p className="text-sm font-black text-[#66746b]">
              <T en={selectedPlan === "student" ? "Student membership" : "Annual membership"} zh={selectedPlan === "student" ? "学生会员" : "年度会员"} />
            </p>
            <div className="mt-2 flex flex-wrap items-end gap-2">
              <p className="font-serif text-5xl font-black">{currency(activePrice)}</p>
              {selectedPlan === "student" ? (
                <p className="mb-1 text-sm font-black text-[#66746b] line-through">{currency(MEMBERSHIP_PRICE)}</p>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-[#66746b]"><T en="Book rewards, cafe perks, event discounts" zh="图书积分、咖啡权益、活动折扣" /></p>
          </div>
        </div>
      </section>

      <aside className="rounded-lg border border-[#15231d]/10 bg-[#fffaf0]/78 p-5 shadow-sm">
        <h2 className="font-serif text-2xl font-black"><T en="Member perks" zh="会员权益" /></h2>
        <div className="mt-4 space-y-3">
          {[
            ["2,680 welcome points", "赠送 2,680 积分"],
            ["Free birthday coffee", "生日咖啡券"],
            ["Student members get 10% off", "学生会员 9 折"],
            ["20% off events", "活动 8 折"],
          ].map(([en, zh]) => (
            <div key={en} className="flex items-center gap-3 rounded-lg bg-white/55 p-3 text-sm font-bold">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#2f5f4f] text-[#fffaf0]">
                <Check size={15} />
              </span>
              <T en={en} zh={zh} />
            </div>
          ))}
        </div>
      </aside>

      <section className="xl:col-span-2 rounded-lg border border-[#15231d]/10 bg-[#fffaf0]/78 p-5 shadow-sm">
        <div className="mb-6">
          <h2 className="font-serif text-3xl font-black"><T en="Choose member type" zh="选择会员类型" /></h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              {
                id: "standard" as MembershipPlan,
                icon: Crown,
                title: { en: "Standard", zh: "普通会员" },
                desc: { en: "Full annual perks for readers and cafe orders.", zh: "年度图书、咖啡和活动权益。" },
                price: currency(MEMBERSHIP_PRICE),
              },
              {
                id: "student" as MembershipPlan,
                icon: GraduationCap,
                title: { en: "Student", zh: "学生会员" },
                desc: {
                  en: `Student price: 10% off, save ${currency(studentSaving)}.`,
                  zh: `学生价 9 折，节省 ${currency(studentSaving)}。`,
                },
                price: currency(studentPrice(MEMBERSHIP_PRICE)),
              },
            ].map((plan) => {
              const Icon = plan.icon;
              const active = selectedPlan === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={cn(
                    "flex min-h-32 items-start gap-4 rounded-lg border p-4 text-left transition",
                    active
                      ? "border-[#2f5f4f] bg-[#2f5f4f] text-[#fffaf0] shadow-lg shadow-[#2f5f4f]/15"
                      : "border-[#15231d]/10 bg-white/55 text-[#15231d] hover:border-[#2f5f4f]/45",
                  )}
                >
                  <span className={cn("grid size-10 shrink-0 place-items-center rounded-full", active ? "bg-white/15" : "bg-[#2f5f4f]/10")}>
                    <Icon size={19} />
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-serif text-2xl font-black"><T en={plan.title.en} zh={plan.title.zh} /></span>
                      {plan.id === "student" ? (
                        <span className={cn("rounded-full px-2 py-1 text-xs font-black", active ? "bg-[#d9a441] text-[#15231d]" : "bg-[#d9a441]/25 text-[#b64f34]")}>
                          <T en={`${Math.round(STUDENT_DISCOUNT_RATE * 100)}% off`} zh="9 折" />
                        </span>
                      ) : null}
                    </span>
                    <span className={cn("mt-1 block text-sm leading-6", active ? "text-[#e9ddc8]" : "text-[#66746b]")}>
                      <T en={plan.desc.en} zh={plan.desc.zh} />
                    </span>
                    <span className="mt-3 block font-serif text-3xl font-black">{plan.price}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-black"><T en="Demo payment method" zh="演示付款方式" /></h2>
            <p className="mt-1 text-sm text-[#66746b]"><T en="Choose one method for the prototype checkout." zh="为原型结账选择一种付款方式。" /></p>
          </div>
          {paid ? (
            <span className="inline-flex h-10 items-center gap-2 rounded-full bg-[#2f5f4f] px-4 text-sm font-black text-[#fffaf0]">
              <Check size={16} />
              <T en="Purchased" zh="已购买" />
            </span>
          ) : null}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const active = selectedMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelectedMethod(method.id)}
                className={cn(
                  "flex min-h-16 items-center gap-3 rounded-lg border px-4 text-left text-sm font-black transition",
                  active
                    ? "border-[#b64f34] bg-[#b64f34] text-white shadow-lg shadow-[#b64f34]/15"
                    : "border-[#15231d]/10 bg-white/55 text-[#15231d] hover:border-[#b64f34]/45",
                )}
              >
                <Icon size={20} />
                <span>{method.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handlePurchase}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#15231d] px-6 font-black text-[#f5f0e5] md:w-auto"
        >
          <CreditCard size={18} />
          <T en="Pay demo and continue to sign in" zh="模拟付款并继续登录" />
        </button>
      </section>
    </div>
  );
}
