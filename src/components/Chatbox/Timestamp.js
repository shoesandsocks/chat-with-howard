import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Greyspan = styled.span`
  color: grey;
  margin: 0 6px;
  font: small-caps 0.65em 'Open Sans', sans-serif;
  align-self: flex-end;
`;

const Timestamp = ({ time }) => <Greyspan>{time}</Greyspan>;

Timestamp.propTypes = {
  time: PropTypes.string.isRequired,
};
export default Timestamp;
