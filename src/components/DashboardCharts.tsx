"use client";

import dynamic from "next/dynamic";

const DashboardChartsBody = dynamic(
  () => import("@/components/DashboardChartsBody").then((mod) => mod.DashboardChartsBody),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="h-80 animate-pulse rounded-xl border border-[#15231d]/10 bg-[#fffaf0]/78" />
        <div className="h-80 animate-pulse rounded-xl border border-[#15231d]/10 bg-[#fffaf0]/78" />
      </div>
    ),
  },
);

export function DashboardCharts() {
  return <DashboardChartsBody />;
}
