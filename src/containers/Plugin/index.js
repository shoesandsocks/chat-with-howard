import React from 'react';
import styled from 'styled-components';

import { darkBlue, orange } from '../../utils/palette';

const PluginWrap = styled.div`
  height: 92vh;
  padding-top: 4em;
  background: ${darkBlue};
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s;
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
  text-decoration-color: ${orange};
  transition: all 0.25s;
  &:hover {
    color: ${orange};
  }
`;

const Plugin = () => (
  <PluginWrap>
    <Big>There is a wordpress plugin.</Big>
    <Text>This is where I link to the wordpress plugin at some point</Text>
  </PluginWrap>
);

export default Plugin;
