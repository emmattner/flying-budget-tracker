const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/assets/style.css',
    '/js/index.js',
    '/js/indexedDB.js',
    '/assets/icons/icon-192x192.png',
    '/assets/icons/icon-512x512.png',
    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://cdn.jsdelivr.net/npm/chart.js@2.8.0',
];

const CACHE_NAME = "static-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keyList) => {
                return Promise.all(
                    keyList.map((key) => {
                        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                            return caches.delete(key);
                        }
                    })
                );
            })
    );
    self.clients.claim()
});
