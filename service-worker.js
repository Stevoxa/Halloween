// Namn på cachen
const CACHE_NAME = 'halloween-pwa-cache-v4';

// Basfiler som alltid precachas
const coreUrlsToCache = [
  '/',
  'index.html',
  'style.css',
  'app.js',
  'manifest.json',
  'images/silas.png',
  'images/treasure.png',
  'images/icon-192.png',
  'images/icon-512.png',
];

// Försök precacha alla resurser i /audio, /images och /icons.
// Listorna nedan bygger på din nuvarande struktur. Om någon fil saknas
// fortsätter vi ändå (fail-safe) så att installationen inte går sönder.
const audioFiles = [
  'audio/spooky_start.mp3',
  'audio/correct_answer.mp3',
  'audio/wrong_answer.mp3',
  'audio/dialogue_start.mp3',
  'audio/dialogue_end.mp3',
  'audio/dialogue_1_story.mp3','audio/dialogue_1_next.mp3',
  'audio/dialogue_2_story.mp3','audio/dialogue_2_next.mp3',
  'audio/dialogue_3_story.mp3','audio/dialogue_3_next.mp3',
  'audio/dialogue_4_story.mp3','audio/dialogue_4_next.mp3',
  'audio/dialogue_5_story.mp3','audio/dialogue_5_next.mp3',
  'audio/dialogue_6_story.mp3','audio/dialogue_6_next.mp3',
  'audio/dialogue_7_story.mp3','audio/dialogue_7_next.mp3',
  'audio/dialogue_8_story.mp3','audio/dialogue_8_next.mp3',
  'audio/dialogue_9_story.mp3','audio/dialogue_9_next.mp3',
  'audio/dialogue_10_story.mp3',
  'audio/task_1.mp3','audio/task_2.mp3','audio/task_3.mp3','audio/task_4.mp3','audio/task_5.mp3','audio/task_6.mp3','audio/task_7.mp3','audio/task_8.mp3','audio/task_9.mp3',
  'audio/zombie_close.mp3','audio/zombie_near.mp3','audio/zombie_hit.mp3','audio/1zombie_close.mp3',
  'audio/clown_close.mp3','audio/clown_near.mp3','audio/clown_hit.mp3',
  'audio/demon_close.mp3','audio/demon_near.mp3','audio/demon_hit.mp3',
  'audio/hamster_close.mp3','audio/hamster_near.mp3','audio/hamster_hit.mp3',
  'audio/insekt_close.mp3','audio/insekt_near.mp3','audio/insekt_hit.mp3',
  'audio/spindel_close.mp3','audio/spindel_near.mp3','audio/spindel_hit.mp3',
  'audio/vampire_close.mp3','audio/vampire_near.mp3','audio/vampire_hit.mp3',
  'audio/wolf_close.mp3','audio/wolf_near.mp3','audio/wolf_hit.mp3',
];

const imageFiles = [
  'images/start_background.png','images/start_background_1.png',
  'images/silas.png','images/silas_happy.png',
  'images/clown_jumpscare.png','images/demon_jumpscare.png','images/hamster_jumpscare.png','images/insekt_jumpscare.png','images/spindel_jumpscare.png','images/wolf_jumpscare.png','images/vampire_jumpscare.png','images/zombie_jumpscare.png',
  'images/task_anslagstavlan.png','images/task_bouleplanen.png','images/task_dodensalle.png','images/task_fotbollsplanen.png','images/task_galgbacken.png','images/task_gunorna.png','images/task_krakslottet.png','images/task_offerlatsen.png','images/task_trad.png','images/task_trollbron.png',
  'images/treasure.png',
];

const iconFiles = [
  'icons/clown.svg','icons/crosshair.svg','icons/devil.svg','icons/gem.svg','icons/halloween-ghost.svg','icons/hamster.svg','icons/mosquito.svg','icons/spider.svg','icons/tombstone.svg','icons/vampire.svg','icons/wolf.svg','icons/zombie-hand.svg',
];

const urlsToCache = [...coreUrlsToCache, ...imageFiles, ...audioFiles, ...iconFiles];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Lägg först in core, som måste fungera
      await cache.addAll(coreUrlsToCache);
      // Lägg sedan till resterande men tolerera fel så SW inte failar
      await Promise.allSettled(
        [...imageFiles, ...audioFiles, ...iconFiles].map((url) =>
          cache.add(url).catch(() => undefined)
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => (key === CACHE_NAME ? null : caches.delete(key)))
      )
    )
  );
  self.clients.claim();
});

// Hämta filer från cachen om de finns (cache-first)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
