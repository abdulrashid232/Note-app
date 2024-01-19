const CACHE_NAME = 'note-app-cache';
const urlsToCache = [
    '/',
    'note.html',
    'manifest.json',
    'note.js',
    'images/logo192.png',
    'style.css'
    
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
