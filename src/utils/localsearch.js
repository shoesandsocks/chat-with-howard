// import howard from '../data/howard.json';
import { get } from 'idb-keyval';

const randomNumber = () => Math.floor(Math.random() * 4000);

const getQ = () =>
  get(randomNumber)
    .then(val => val)
    .catch(() => 'Howard is so dead rn');

export default getQ;
