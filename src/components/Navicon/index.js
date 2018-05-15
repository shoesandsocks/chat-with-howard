import React from 'react';

import './Navicon.css';

const Navicon = () => (
  <button id="navicon" className="" onClick={e => console.log(e.target)}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  </button>
);

export default Navicon;
