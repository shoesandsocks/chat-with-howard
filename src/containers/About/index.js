import React from 'react';
import styled from 'styled-components';

import { darkBlue } from '../../utils/palette';

const AboutWrap = styled.div`
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

const Big = styled.a`
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

const About = () => (
  <AboutWrap>
    <Text>Chat With Howard is</Text>
    <Text>inspired by, and </Text>
    <Text>fed with data from</Text>
    <Big href="http://www.howardchicken.com">howardchicken.com</Big>
  </AboutWrap>
);

export default About;
