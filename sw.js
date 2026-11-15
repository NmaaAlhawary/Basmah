const CACHE = 'basmah-v12';
const FILES = ['./', 'index.html', 'styles.css', 'app.js', 'i18n-en.js', 'manifest.webmanifest',
  'assets/logo.svg', 'assets/logo-gold.svg', 'assets/wordmark.svg', 'assets/icon-192.png', 'assets/icon-512.png',
  'assets/icons/bold.css', 'assets/icons/fill.css', 'assets/icons/duotone.css',
  'assets/icons/Phosphor-Bold.woff2', 'assets/icons/Phosphor-Fill.woff2', 'assets/icons/Phosphor-Duotone.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
});
self.addEventListener('fetch', e => {
  // network first so edits show up, cache as offline fallback
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone();
    caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
    return r;
  }).catch(() => caches.match(e.request)));
});
