var cacheID = "mws-restaurant-01";

const cacheFiles = [
  "/",
  "/index.html",
  "/restaurant.html",
  "/css/styles.css",
  "/data/restaurants.json",
  "/js/dbhelper.js",
  "/js/main.js",
  "/js/restaurant_info.js",
  "/js/register.js",
  "/img/1.jpg",
  "/img/2.jpg",
  "/img/3.jpg",
  "/img/4.jpg",
  "/img/5.jpg",
  "/img/6.jpg",
  "/img/7.jpg",
  "/img/8.jpg",
  "/img/9.jpg",
  "/img/10.jpg"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheID).then(cache => {
      console.log("Caches open successful!");
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if(response) {
        console.log("Found ", event.request, "in cache.");
        return response;
      }
      else {
        console.log("Could not find ", event.request, "in cache, FETCHING!");
        return fetch(event.request)
        .then(response => {
          const clonedResponse = response.clone();
          caches.open(cacheID).then(cache => {
            cache.put(event.request, clonedResponse);
          })
          return response;
        })
        .catch(error => {
          console.log(error);
        });
      }
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Activating new service worker...');
  const cacheWhitelist = cacheID;
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if(cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
