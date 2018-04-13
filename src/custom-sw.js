import { set } from 'idb-keyval';
import howard from './data/howard.json';

function createDB() {
  howard.forEach((h, i) => set(i.toString(), h));
}

self.addEventListener('activate', (event) => {
  event.waitUntil(createDB());
});
