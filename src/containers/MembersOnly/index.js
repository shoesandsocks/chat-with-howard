import React from 'react';
import PropTypes from 'prop-types';
// import styled, { keyframes } from 'styled-components';

// import { darkBlue } from '../../utils/palette';

class MembersOnly extends React.Component {
  componentDidMount() {
    this.props.toggle();
  }

  render() {
    return <div>hi</div>;
  }
}

MembersOnly.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default MembersOnly;
