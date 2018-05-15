import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Btn = styled.button`
  border: none;
  cursor: pointer;
  background: #434d5a;
  transition: all 0.3s;
  & svg {
    height: 3em;
    width: 3em;
    &:hover {
      fill: orange;
  }
  }
`;

const Navicon = ({ toggleMenu }) => (
  <Btn onClick={toggleMenu}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  </Btn>
);

Navicon.propTypes = { toggleMenu: PropTypes.func.isRequired };


export default Navicon;
