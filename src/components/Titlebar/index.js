import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Bar = styled.div`
  width: 100%;
  color: white;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 2em;
  transition: all 0.3s;
  @media (max-width: 600px) {
    font-size: 1.5em;
    padding: 0.5em;
  }
`;
const Name = styled.p`
  padding: 0;
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
