// Nama cache Anda. Ganti jika Anda membuat perubahan besar pada aplikasi.
const CACHE_NAME = 'alan-putra-busana-cache-v1';

// Daftar file yang akan di-cache saat instalasi.
// Tambahkan URL penting lainnya dari aplikasi Anda jika ada.
const urlsToCache = [
  '/',
  // Tambahkan URL ke halaman utama aplikasi Anda di Blogger di sini
  // Contoh: '/p/dashboard.html'
];

// Event 'install': Service worker sedang diinstal.
self.addEventListener('install', (event) => {
  // Tunggu hingga proses caching selesai.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache dibuka');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event 'activate': Service worker telah diaktifkan.
// Berguna untuk membersihkan cache lama.
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Hapus cache yang tidak ada dalam whitelist
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Event 'fetch': Setiap kali halaman meminta resource (HTML, CSS, JS, gambar).
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Coba cari resource di cache terlebih dahulu.
    caches.match(event.request)
      .then((response) => {
        // Jika ditemukan di cache, kembalikan dari cache.
        if (response) {
          return response;
        }
        // Jika tidak, ambil dari jaringan.
        return fetch(event.request);
      }
    )
  );
});
