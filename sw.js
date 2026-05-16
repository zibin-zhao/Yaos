const CACHE_NAME = 'yaoshi-v1';
const ASSETS = [
  './',
  './index.html',
  './calendar.html',
  './readings.html',
  './css/style.css',
  './js/app.js',
  './js/i18n.js',
  './js/shichen.js',
  './js/jieqi.js',
  './js/calendar.js',
  './js/readings.js',
  './data/shichen-data.js',
  './data/jieqi-data.js',
  './data/lunar-data.js',
  './data/readings-data.js',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
