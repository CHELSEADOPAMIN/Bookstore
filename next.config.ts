import type { NextConfig } from "next";

const noStore = "no-store, max-age=0, must-revalidate";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "covers.openlibrary.org" },
    ],
  },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: noStore },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source: "/manifest.webmanifest",
        headers: [{ key: "Cache-Control", value: "no-cache, max-age=0, must-revalidate" }],
      },
      {
        source: "/((?!_next/static|_next/image|icon.svg|manifest.webmanifest|sw.js|workbox-.*\\.js).*)",
        headers: [{ key: "Cache-Control", value: noStore }],
      },
    ];
  },
};

export default nextConfig;
