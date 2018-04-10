import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Bar = styled.div`
  width: 100%;
  height: 60px;
  color: white;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 2em;
`;
const Name = styled.p`
  margin: 0;
  letter-spacing: 5px;
`;

const Titlebar = ({ title }) => (
  <Bar>
    <Name>{title}</Name>
  </Bar>
);

Titlebar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Titlebar;
