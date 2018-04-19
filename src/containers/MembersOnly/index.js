import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

import ScheduleForm from '../../components/ScheduleForm';

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
const StatusBar = styled.div`
  height: 2em;
  width: 67%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const BarSpan = styled.span`
  margin: 0 1em;
  color: white;
`;

const Break = styled.div`
  background: white;
  height: 2px;
  width: 80%;
  margin: 2em 0;
`;

class MembersOnly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      mouthiness: '',
      hushed: '',
      isLoading: false,
      error: '',
    };
  }

  componentDidMount() {
    this.getHowardSettings();
  }

  getHowardSettings = () => {
    this.setState({ isLoading: true });
    axios
      .get('/howardsettings', {
        headers: {
          token: sessionStorage.getItem('token'), // eslint-disable-line
        },
      })
      .then((response) => {
        // console.log(response);
        this.setState({
          status: response.data.status,
          mouthiness: response.data.mouthiness,
          hushed: response.data.hushed,
          isLoading: false,
        });
      })
      .catch((e) => {
        this.setState({ error: e });
      });
  };

  render() {
    if (this.state.isLoading || !this.props.user.tumblr_id) {
      return (
        <MembersOnlyWrap>
          <p>loading...</p>
          {this.state.error !== '' && <p>...but something has gone wrong.</p>}
        </MembersOnlyWrap>
      );
    }
    const { status, mouthiness, hushed } = this.state;
    return (
      <MembersOnlyWrap>
        <StatusBar>
          <BarSpan>Howard Status: {status ? 'on' : 'off'}</BarSpan>
          <BarSpan>Mouthiness: {mouthiness}%</BarSpan>
          <BarSpan>Hushed? {hushed ? 'yes' : 'no'}</BarSpan>
        </StatusBar>
        <Break />
        <ScheduleForm tumblr_id={this.props.user.tumblr_id} />
      </MembersOnlyWrap>
    );
  }
}

MembersOnly.propTypes = {
  tumblr_id: PropTypes.string.isRequired,
};

export default MembersOnly;
