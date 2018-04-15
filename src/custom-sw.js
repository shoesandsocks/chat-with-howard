import { set } from 'idb-keyval';
import howard from './data/howard.json';

function createDB() {
  set('quotes', howard);
}

self.addEventListener('activate', (event) => {
  event.waitUntil(createDB());
});

console.log('hello');

// https://stackoverflow.com/questions/45467842/how-to-clear-cache-of-service-worker
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then(cacheNames =>
    Promise.all(cacheNames
      .filter((cacheName) => {
        // Return true if you want to remove this cache,
        // but remember that caches are shared across
        // the whole origin
      })
      .map(cacheName => caches.delete(cacheName)))));
});
