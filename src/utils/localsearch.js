import { get } from 'idb-keyval';

const rnd = array => Math.floor(Math.random() * array.length);

const getQ = () => {
  get('quotes')
    .then((val) => {
      const aQuote = val[rnd(val)];
      // console.log(aQuote);
      return aQuote;
    })
    .catch(() => ['Howard daid.']);
};

export default getQ;
