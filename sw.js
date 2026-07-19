const CACHE_NAME = 'portfolio-v2';

// Resolved inside the event handlers (not at parse time) since self.scope
// reflects the registration scope, which works whether the site is served
// from '/' (local) or a GitHub Pages repo subpath (prod).
const PRECACHE_PATHS = ['', 'favicon.ico', 'manifest.json', 'hero.webp', 'Mayesh_Dani_Resume.pdf'];

self.addEventListener('install', (event) => {
  const scope = self.registration.scope;
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const urls = PRECACHE_PATHS.map((path) => new URL(path, scope).href);
      return cache.addAll(urls);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // This is a client-routed SPA - there's one real HTML document.
  // Navigations to any route (e.g. /about) should try the network first,
  // then fall back to the cached app shell so the app still boots offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match(self.registration.scope))
    );
    return;
  }

  // Static assets: cache-first, then fetch from network and store the
  // response for next time - this is what lets the hashed JS/CSS bundles
  // (unknown at SW-authoring time) become available offline after a visit.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
        }
        return response;
      });
    })
  );
});
