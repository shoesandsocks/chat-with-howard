import React from 'react';
import ReactDOM from 'react-dom';
import { set } from 'idb-keyval';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import howard from './data/howard.json';

const createDB = () => {
  set('quotes', howard);
};

createDB();

ReactDOM.render(<App />, document.getElementById('root')); // eslint-disable-line
registerServiceWorker();
