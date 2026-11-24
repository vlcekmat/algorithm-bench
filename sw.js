// Offline cache. The cache name comes from version.js: bump APP_VERSION there whenever any file changes.
importScripts('version.js');
const VERSION = 'algobench-' + self.APP_VERSION;
const FILES = [
  './', './index.html', './guide.html', './version.js', './fonts.css', './manifest.webmanifest',
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
// The page itself: network first (so updates show up right away), cache when offline.
// Everything else: cache first, refreshed in the background.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // pages and version.js: network first, so the version mark matches the page you are looking at
  if (req.mode === 'navigate' || new URL(req.url).pathname.endsWith('/version.js')) {
    e.respondWith((async () => {
      const cache = await caches.open(VERSION);
      try {
        // no-cache: always ask the server whether the page changed, instead of trusting the browser's HTTP cache
        const res = await Promise.race([fetch(req.url, {cache: 'no-cache', credentials: 'same-origin'}), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 3000))]);
        const path = new URL(req.url).pathname;
        // the guide is cached under its own name; only the app page itself goes in as index.html
        const key = req.mode !== 'navigate' ? './version.js' : (path.endsWith('/') || path.endsWith('/index.html')) ? './index.html' : req;
        if (res.ok) cache.put(key, res.clone());
        return res;
      } catch (_) {
        if (req.mode !== 'navigate') return (await cache.match('./version.js')) || Response.error();
        return (await cache.match(req, {ignoreSearch: true})) || (await cache.match('./index.html')) || (await cache.match('./')) || Response.error();
      }
    })());
    return;
  }
  e.respondWith(caches.open(VERSION).then(async cache => {
    const hit = await cache.match(req, {ignoreSearch: true});
    const net = fetch(req).then(res => { if (res.ok) cache.put(req, res.clone()); return res; }).catch(() => null);
    return hit || (await net) || Response.error();
  }));
});
