const CACHE_NAME = "local-books-prototype-v3";
const CORE_ASSETS = ["/manifest.webmanifest", "/icon.svg"];
const OFFLINE_HTML = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Local Books Offline</title>
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f5f0e5; color: #15231d; font: 16px/1.5 Georgia, serif; }
      main { max-width: 520px; padding: 32px; }
    </style>
  </head>
  <body>
    <main>
      <h1>Offline</h1>
      <p>The app shell is updating or the network is unavailable. Reconnect and refresh.</p>
    </main>
  </body>
</html>`;

if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
  self.addEventListener("install", () => self.skipWaiting());
  self.addEventListener("activate", (event) => {
    event.waitUntil(
      caches
        .keys()
        .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
        .then(() => self.registration.unregister())
        .then(() => self.clients.matchAll())
        .then((clients) => clients.forEach((client) => client.navigate(client.url))),
    );
  });
} else {
  self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
    self.skipWaiting();
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(
      caches
        .keys()
        .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
    );
    self.clients.claim();
  });

  self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
      self.skipWaiting();
    }
  });

  self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;
    const url = new URL(event.request.url);
    const isSameOrigin = url.origin === location.origin;

    if (url.pathname.startsWith("/_next/")) {
      event.respondWith(fetch(event.request, { cache: "no-store" }));
      return;
    }

    if (event.request.mode === "navigate") {
      event.respondWith(
        fetch(event.request, { cache: "no-store" })
          .then((response) => {
            if (response.ok && isSameOrigin) {
              const copy = response.clone();
              caches
                .open(CACHE_NAME)
                .then((cache) => cache.put("/", copy))
                .catch(() => undefined);
            }
            return response;
          })
          .catch(() =>
            caches
              .match("/")
              .then(
                (cached) =>
                  cached ||
                  new Response(OFFLINE_HTML, {
                    headers: { "Content-Type": "text/html; charset=utf-8" },
                  }),
              ),
          ),
      );
      return;
    }

    if (!isSameOrigin) return;

    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request)
          .then((response) => {
            if (!response.ok) return response;
            const copy = response.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, copy))
              .catch(() => undefined);
            return response;
          })
          .catch(() => cached);
      }),
    );
  });
}
