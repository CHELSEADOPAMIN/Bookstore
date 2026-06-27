import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Shell } from "@/components/Shell";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "Local Books Bookstore",
  description: "Bilingual bookstore cafe PWA prototype / 双语书店咖啡原型",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Local Books",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#15231d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ServiceWorkerRegister />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
