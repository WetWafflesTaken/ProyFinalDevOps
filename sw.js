// ============================================================
// RECETAS DON ELADIO — Service Worker
// ============================================================

const CACHE_NAME = 'don-eladio-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './recipes.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Crimson+Pro:wght@300;400;600&display=swap'
];

// INSTALL — precache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-caching assets');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// ACTIVATE — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// FETCH — Cache-first strategy
self.addEventListener('fetch', event => {
  // Skip non-GET and chrome-extension requests
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          // Cache successful responses
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
          return response;
        })
        .catch(() => {
          // Fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
