import { set } from 'idb-keyval';
import howard from './data/howard.json';

function createDB() {
  set('quotes', howard);
}

self.addEventListener('activate', (event) => {
  event.waitUntil(createDB());
});
