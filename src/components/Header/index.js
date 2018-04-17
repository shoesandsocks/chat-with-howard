import React from 'react';
import styled from 'styled-components';

import Navicon from '../Navicon';

import { darkBlue } from '../../utils/palette';

const HeaderWrap = styled.div`
  background: ${darkBlue};
  padding: 1em 0 0 3em;
  @media (max-width: 600px) {
    padding: 1em;
  }
`;

const Header = props => (
  <HeaderWrap>
    <Navicon props={props} />
  </HeaderWrap>
);

export default Header;
