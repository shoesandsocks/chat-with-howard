import React from 'react';
// import PropTypes from 'prop-types';
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
  & p {
    color: white;
  }
  @media (max-width: 600px) {
    /* hi */
  }
`;

class MembersOnly extends React.Component {
  componentDidMount() {
    this.getHowardSettings();
  }

  getHowardSettings = () => {
    fetch('/howardsettings', {
      headers: {
        token: sessionStorage.getItem('token'),
      },
    }).then((response) => {
      console.log(response.data);
      this.setState({
        status: response.data.status,
        mouthiness: response.data.mouthiness,
        hushed: response.data.hushed,
      });
    });
  };

  render() {
    const { status, mouthiness, hushed } = this.state;
    if (!status) {
      return (
        <MembersOnlyWrap>
          <p>loading...</p>
        </MembersOnlyWrap>
      );
    }
    return (
      <MembersOnlyWrap>
        <p>Howard Status:</p>
        <p>Mouthiness: {mouthiness}%</p>
        <p>Hushed: {hushed ? 'true' : 'false'}</p>
        <p>Status: {status ? 'on' : 'off'}</p>
      </MembersOnlyWrap>
    );
  }
}

MembersOnly.propTypes = {};

export default MembersOnly;
