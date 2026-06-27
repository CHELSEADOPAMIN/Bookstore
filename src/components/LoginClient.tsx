"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { T } from "@/components/I18nText";
import { useAppStore } from "@/store/useAppStore";

export function LoginClient() {
  const { member, membershipPurchased, login, logout } = useAppStore();
  const [name, setName] = useState("Chelsea");
  const [phone, setPhone] = useState("13800008888");

  if (member) {
    return (
      <div className="rounded-xl border border-[#15231d]/10 bg-[#15231d] p-6 text-[#f5f0e5]">
        <p className="text-sm text-[#d9a441]"><T en="Signed in with localStorage" zh="已使用本地存储登录" /></p>
        <h2 className="mt-2 font-serif text-4xl font-black">{member.name}</h2>
        <p className="mt-2 text-[#e9ddc8]">{member.phone} · {member.level} Member · {member.points} <T en="pts" zh="积分" /></p>
        <button onClick={logout} className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white/10 px-5 font-bold">
          <LogOut size={16} />
          <T en="Sign Out" zh="退出" />
        </button>
      </div>
    );
  }

  if (!membershipPurchased) {
    return (
      <div className="max-w-xl rounded-lg border border-[#15231d]/10 bg-[#fffaf0]/78 p-5 shadow-sm">
        <p className="text-sm font-black text-[#b64f34]"><T en="Membership required" zh="需要先加入会员" /></p>
        <h2 className="mt-2 font-serif text-3xl font-black"><T en="Buy a membership before sign in" zh="购买会员后再登录" /></h2>
        <p className="mt-2 text-sm leading-6 text-[#66746b]">
          <T
            en="This demo keeps the member purchase step before localStorage sign in."
            zh="此演示将会员购买步骤放在本地登录之前。"
          />
        </p>
        <Link href="/member/join" className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-[#15231d] px-6 font-black text-[#f5f0e5]">
          <LogIn size={18} />
          <T en="Join Membership" zh="加入会员" />
        </Link>
      </div>
    );
  }

  return (
    <form
      className="max-w-xl rounded-xl border border-[#15231d]/10 bg-[#fffaf0]/78 p-5 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        login(name, phone);
      }}
    >
      <label className="block">
        <span className="text-sm font-black"><T en="Name" zh="昵称" /></span>
        <input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#15231d]/10 bg-white/60 px-4 outline-none" />
      </label>
      <label className="mt-4 block">
        <span className="text-sm font-black"><T en="Phone" zh="手机号" /></span>
        <input value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#15231d]/10 bg-white/60 px-4 outline-none" />
      </label>
      <button className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-[#15231d] px-6 font-black text-[#f5f0e5]">
        <LogIn size={18} />
        <T en="Sign In Demo" zh="模拟登录" />
      </button>
    </form>
  );
}
