import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { darkBlue } from '../../utils/palette';

const MembersOnlyWrap = styled.div`
  height: 92vh;
  padding-top: 4em;
  background: ${darkBlue};
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s;
  @media (max-width: 600px) {
    /* hi */
  }
`;

class MembersOnly extends React.Component {
  componentDidMount() {
    this.props.toggle();
  }

  render() {
    return <MembersOnlyWrap>hi member</MembersOnlyWrap>;
  }
}

MembersOnly.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default MembersOnly;
