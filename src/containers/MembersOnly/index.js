import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

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
    width: 85%;
  }
`;

const BarSpan = styled.span`
  margin: 0 0.5em;
  color: white;
  font: 1em 'Inconsolata', sans-serif;
  @media (max-width: 600px) {
    margin: 0.25em;
    font-size: 0.8em;
  }
`;

const Break = styled.div`
  background: white;
  height: 2px;
  width: 85%;
  margin: ${props => (props.margin ? props.margin : '2em 0')};
`;

const UpdateBtn = styled.button`
  border: none;
  background: orange;
  padding: 0.25em 0.75em;
  border-radius: 6px;
  color: white;
  margin: 1em 0em 1em 0em;
  cursor: pointer;
`;

const Ul = styled.ul`
  list-style-type: none;
  padding-left: 0px;
  text-align: left;
  font-size: 0.75em;
  margin: 1em 0em 1em 0em;
`;

class MembersOnly extends React.PureComponent {
  // TODO: testing here
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      mouthiness: '',
      hushed: '',
      isLoading: false,
      error: '',
      userCronJobs: [],
      channels: [],
      coreupdate: {},
      dirty: false,
      // DEV
      // userCronJobs: [
      //   {
      //     jobName: 'x',
      //     channelName: 'y',
      //     cronSked: '*/4 * * * *',
      //   },
      // ],
      // channels: [
      //   {
      //     name: 'y',
      //     id: '123',
      //   },
      //   {
      //     name: 'x',
      //     id: '1323',
      //   },
      //   {
      //     name: 'z',
      //     id: '123r3',
      //   },
      // ],
      isFormLoading: false,
      message: null,
    };
  }

  componentDidMount() {
    if (this.state.status === '') {
      this.getHowardSettings(); // DEV
      this.cronServerRequest();
    }
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('sCU in MembersOnly is running');
  //   if (this.props === nextProps) return false;
  //   return true;
  // }

  getHowardSettings = () => {
    this.setState({ isLoading: true });
    axios
      .get('/howardsettings', {
        headers: {
          token: sessionStorage.getItem('token'), // eslint-disable-line
        },
      })
      .then((response) => {
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

  getCoreUpdate = () => {
    const token = sessionStorage.getItem('token'); // eslint-disable-line
    axios.get('/howardupdate', { headers: { token } }).then((response) => {
      this.setState({ coreupdate: response.data, dirty: true });
    });
  }
  clearDirty = () => this.setState({ coreupdate: {}, dirty: false })

  cronServerRequest = (action, jobOrName) => {
    const token = sessionStorage.getItem('token'); // eslint-disable-line
    const { tumblr_id } = jwtDecode(token);
    let uri;
    let payload;
    if (action === 'delete') {
      uri = '/howardcron/kill';
      payload = { tumblr_id, jobName: jobOrName };
    } else if (action === 'add') {
      uri = '/howardcron/add';
      payload = { tumblr_id, newJob: jobOrName };
    } else {
      uri = '/howardcron';
      payload = { tumblr_id };
    }
    this.setState({ isFormLoading: true, message: null });
    return axios
      .post(uri, payload, { headers: { token } })
      .then((response) => {
        const { usersJobs, channels } = response.data.jobsAndChannels;
        const { message } = response.data;
        console.log('Server response message: ', message); // eslint-disable-line
        this.setState({
          userCronJobs: usersJobs[0].activeCronJobs,
          channels,
          isFormLoading: false,
        });
      })
      .catch((e) => {
        console.log('something went wrong interacting w server: ', e); // eslint-disable-line
        this.setState({ message: e });
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <MembersOnlyWrap>
          <p>loading...</p>
          {this.state.error !== '' && <p>...but something has gone wrong.</p>}
        </MembersOnlyWrap>
      );
    }
    const {
      status,
      mouthiness,
      hushed,
      userCronJobs,
      channels,
      isFormLoading,
      message,
      coreupdate,
      dirty,
    } = this.state;
    const { depQuotes, newQuotes } = coreupdate;
    const layout = array =>
      array.map((a, i) => (
        <li key={i}>
          <code>{JSON.stringify(a)}</code>
        </li>
      ));
    return (
      <MembersOnlyWrap>
        <Break margin=".25em 0" />
        <StatusBar>
          <BarSpan>Howard Status: {status ? 'on' : 'off'}</BarSpan>
          <BarSpan>Mouthiness: {mouthiness}%</BarSpan>
          <BarSpan>Hushed? {hushed ? 'yes' : 'no'}</BarSpan>
        </StatusBar>
        <Break margin=".25em 0" />
        <Break />
        <ScheduleForm
          cronServerRequest={this.cronServerRequest}
          channels={channels}
          userCronJobs={userCronJobs}
          isFormLoading={isFormLoading}
          message={message}
        />
        <Break />
        {!dirty && <UpdateBtn onClick={this.getCoreUpdate}>Check for Updates</UpdateBtn>}
        {dirty && newQuotes.length > 0 ? (
          <div>
            <h3>new quotes</h3>
            <Ul>{layout(newQuotes)}</Ul>
          </div>
        ) : (
          <h3>No new quotes found</h3>
        )}
        <br />
        {dirty && depQuotes.length > 0 ? (
          <div>
            <h3>deprecated quotes</h3>
            <Ul>{layout(depQuotes)}</Ul>
          </div>
        ) : (
          <h3>Nothing deprecated</h3>
        )}
        <br />
        {dirty &&
          <UpdateBtn onClick={this.clearDirty}>Okay...</UpdateBtn>
        }
      </MembersOnlyWrap>
    );
  }
}

MembersOnly.propTypes = {};

export default MembersOnly;
