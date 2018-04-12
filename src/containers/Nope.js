import React from 'react';
import styled from 'styled-components';

import { darkBlue } from '../utils/palette';

const NopeWrap = styled.div`
  height: 96vh;
  background: ${darkBlue};
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s;
  @media (max-width: 600px) {
    padding: 1em;
  }
`;

const Text = styled.p`
  color: white;
  font-family: 'Inconsolata', sans-serif;
  font-size: 1.25em;
  margin: 0;
`;

const Big = styled.h1`
  color: white;
  font-family: 'Inconsolata', sans-serif;
  margin: 1em 0 0 0;
  font-size: 2em;
`;

const Nope = () => (
  <NopeWrap>
    <Text>That&amp;s not a thing.</Text>
    <Text>inspired by, and </Text>
    <Text>fed with data from</Text>
    <Big>404</Big>
  </NopeWrap>
);

export default Nope;
