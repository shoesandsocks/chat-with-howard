import { get } from 'idb-keyval';

const rnd = array => Math.floor(Math.random() * array.length);

const getQ = () =>
  get('quotes')
    .then(val => val[rnd(val)].text)
    .catch(() => ['Howard daid.']);

export default getQ;
