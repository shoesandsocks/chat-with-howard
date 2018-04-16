import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { darkBlue, orange } from '../../utils/palette';

const Btn = styled.button`
  border: none;
  background: ${darkBlue};
  & svg {
    height: 3em;
    width: 3em;
  }
`;

const Navicon = ({ action, active }) => (
  <Btn onClick={action}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={active ? orange : 'white'}
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  </Btn>
);

Navicon.propTypes = {
  action: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Navicon;
