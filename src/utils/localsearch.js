import howard from '../data/howard.json';

const rnd = array => Math.floor(Math.random() * array.length);

const getQ = () => howard[rnd(howard)].text;

export default getQ;
