// v2
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const req = e.request.url.startsWith(self.location.origin)
    ? new Request(e.request, { cache: 'no-cache' })
    : e.request;
  e.respondWith(fetch(req).catch(() => caches.match(e.request)));
});
