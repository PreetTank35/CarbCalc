const CACHE_NAME = 'carbcalc-shell-v3';
const APP_FILES = [
  './',
  './index.html',
  './dashboard.html',
  './heal.html',
  './circle.html',
  './studio.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './icon.svg',
  './CarbCalc-Android.apk',
  './researched by anti gravity/07_Master_Verified_Emission_Dataset_India_2026.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match('./index.html')))
  );
});
