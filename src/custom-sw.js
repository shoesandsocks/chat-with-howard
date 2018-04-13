import { set } from 'idb-keyval';
import howard from './data/howard.json';

console.log('hellow from custom-sw');

function createDB() {
  howard.forEach((h, i) => set(i, h));
}

self.addEventListener('activate', (event) => {
  event.waitUntil(createDB());
});
