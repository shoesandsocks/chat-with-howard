import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { darkBlue } from '../../utils/palette';

const FormWrap = styled.div`
  width: 67%;
  padding: 1em;
  min-height: 20em;
  background: ${darkBlue};
  @media (max-width: 600px) {
    width: 100%;
  }
`;

class ScheduleForm extends Component {
  state = {
    userCronJobs: [],
    isLoading: false,
    tumblr_id: '',
    message: null,
  };

  componentDidMount() {
    this.getCrons();
  }
  getCrons = () => {
    // get ID from token
    let tumblr_id;
    let token;
    try {
      token = sessionStorage.getItem('token'); // eslint-disable-line
      if (token && token !== null) {
        tumblr_id = jwtDecode(token).tumblr_id; // eslint-disable-line
      }
    } catch (e) {
      return console.log('getting token/tumblr_id failed: ', e); // eslint-disable-line
    }
    this.setState({ isLoading: true, message: null, tumblr_id });
    return axios
      .post('/howardcron', { headers: { token } }, { tumblr_id }) // TODO: right? uri, options, data?
      .then((response) => {
        this.setState({ tumblr_id, userCronJobs: response.data.usersJobs, isLoading: false });
      })
      .catch((e) => {
        console.log('something went wrong in getCrons: ', e); // eslint-disable-line
        this.setState({ message: e });
      });
  };
  render() {
    const {
      userCronJobs, isLoading, tumblr_id, message,
    } = this.state;
    if (isLoading) {
      return (
        <FormWrap>
          loading...
          {message && <span>...but something went wrong: {message}</span>}
        </FormWrap>
      );
    }
    return (
      <FormWrap>
        <p>id: {tumblr_id}</p>
        <p>number of jobs: {userCronJobs.length}</p>
      </FormWrap>
    );
  }
}

ScheduleForm.propTypes = {};
export default ScheduleForm;
