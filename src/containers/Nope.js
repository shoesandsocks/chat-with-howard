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
  color: orange;
  font-family: 'Inconsolata', sans-serif;
  margin: 1em 0 0 0;
  font-size: 3em;
`;

const BigA = styled.a`
  color: white;
  font-family: 'Inconsolata', sans-serif;
  margin: 1em 0 0 0;
  font-size: 2em;
  text-decoration-color: orange;
  transition: all 0.25s;
  &:hover {
    color: orange;
  }
`;

const Nope = () => (
  <NopeWrap>
    <Big>- -</Big>
    <Text>That&apos;s not a thing.</Text>
    <Big>404</Big>
    <Big>- -</Big>
    <Text>Maybe you wanted</Text>
    <BigA href="http://www.howardchicken.com">Howard Chicken</BigA>
  </NopeWrap>
);

export default Nope;
