"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

const STORE_POSITION: [number, number] = [-33.9069, 151.2022];

export function DeliveryMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | null = null;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (!ref.current || cancelled) return;
      const storeIcon = L.divIcon({
        className: "",
        html: `
          <span style="
            display: grid;
            width: 34px;
            height: 34px;
            place-items: center;
            border: 3px solid #fffaf0;
            border-radius: 50% 50% 50% 0;
            background: #b64f34;
            box-shadow: 0 10px 20px rgba(21, 35, 29, 0.28);
            color: #fffaf0;
            font-size: 17px;
            font-weight: 900;
            line-height: 1;
            transform: rotate(-45deg);
          ">
            <span style="transform: rotate(45deg);">B</span>
          </span>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -34],
      });

      map = L.map(ref.current, { zoomControl: false }).setView(STORE_POSITION, 14);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
      }).addTo(map);
      L.circle(STORE_POSITION, {
        radius: 2600,
        color: "#b64f34",
        fillColor: "#d9a441",
        fillOpacity: 0.22,
      }).addTo(map);
      L.marker(STORE_POSITION, { icon: storeIcon }).addTo(map).bindPopup("Local Books Bookstore · Green Square");
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return <div ref={ref} className="h-[360px] overflow-hidden rounded-xl border border-[#15231d]/10" />;
}
