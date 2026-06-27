"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { salesData } from "@/data/mock";

export function DashboardChartsBody() {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <div className="h-80 rounded-xl border border-[#15231d]/10 bg-[#fffaf0]/78 p-4">
        <h2 className="mb-4 font-serif text-2xl font-black">Book / Cafe Sales Trend</h2>
        <ResponsiveContainer width="100%" height="82%">
          <AreaChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#15231d22" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="book" stroke="#2f5f4f" fill="#2f5f4f33" name="Books" />
            <Area type="monotone" dataKey="cafe" stroke="#b64f34" fill="#b64f3433" name="Cafe" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="h-80 rounded-xl border border-[#15231d]/10 bg-[#fffaf0]/78 p-4">
        <h2 className="mb-4 font-serif text-2xl font-black">Weekend Peak Mix</h2>
        <ResponsiveContainer width="100%" height="82%">
          <BarChart data={salesData.slice(3)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#15231d22" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="book" fill="#15231d" radius={[8, 8, 0, 0]} name="Books" />
            <Bar dataKey="cafe" fill="#d9a441" radius={[8, 8, 0, 0]} name="Cafe" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
