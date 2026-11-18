// Offline cache. Bump VERSION whenever any file changes.
const VERSION = 'algobench-v1';
const FILES = [
  './', './index.html', './fonts.css', './manifest.webmanifest',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png',
  './icons/maskable-192.png', './icons/maskable-512.png', './icons/apple-touch-icon.png',
  "./fonts/Inter-latin-ext-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7W0Q5n-wU.woff2",
  "./fonts/Inter-latin-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2",
  "./fonts/JetBrainsMono-latin-ext-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx7cwgknk-6nFg.woff2",
  "./fonts/JetBrainsMono-latin-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwgknk-4.woff2",
  "./fonts/SpaceGrotesk-latin-ext-V8mDoQDjQSkFtoMM3T6r8E7mPb94C_k3HqUtEw.woff2",
  "./fonts/SpaceGrotesk-latin-V8mDoQDjQSkFtoMM3T6r8E7mPbF4C_k3HqU.woff2",
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// Cache first so it opens instantly offline; refresh the cache in the background when online.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const hit = await cache.match(e.request, {ignoreSearch: true});
    const net = fetch(e.request).then(res => { if (res.ok) cache.put(e.request, res.clone()); return res; }).catch(() => null);
    return hit || (await net) || (e.request.mode === 'navigate' ? cache.match('./index.html') : Response.error());
  }));
});
