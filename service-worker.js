// Namn på cachen
const CACHE_NAME = 'halloween-pwa-cache-v3';

// Filer som ska sparas i cachen för offline-användning
const urlsToCache = [
    '/',
    'index.html',
    'style.css',
    'app.js',
    'manifest.json',
    'images/silas.png',
    'images/treasure.png',
    'images/icon-192.png',
    'images/icon-512.png',
    // OBS: Lägg till alla dina monster-bilder och ljudfiler här om du vill att de ska fungera offline!
    // Exempel: 'images/zombie_jumpscare.png', 'audio/zombie_hit.mp3' 
];

// Installera Service Worker och lägg filer i cachen
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache öppnad');
                return cache.addAll(urlsToCache);
            })
    );
});

// Hämta filer från cachen om de finns
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Om filen finns i cachen, returnera den. Annars, hämta från nätverket.
                return response || fetch(event.request);
            })
    );
});