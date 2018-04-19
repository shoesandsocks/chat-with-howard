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
    message: null,
  };

  componentDidMount() {
    this.getCrons();
  }

  getCrons = () => {
    const token = sessionStorage.getItem('token'); // eslint-disable-line
    const { tumblr_id } = jwtDecode(token);
    this.setState({ isLoading: true, message: null });
    return axios
      .post('/howardcron', { tumblr_id }, { headers: { token } })
      .then((response) => {
        this.setState({
          userCronJobs: response.data.usersJobs[0].activeCronJobs,
          isLoading: false,
        });
      })
      .catch((e) => {
        console.log('something went wrong in getCrons: ', e); // eslint-disable-line
        this.setState({ message: e });
      });
  };
  render() {
    const { userCronJobs, isLoading, message } = this.state;
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
        <p>You have {userCronJobs.length} jobs set</p>
      </FormWrap>
    );
  }
}

ScheduleForm.propTypes = {};

export default ScheduleForm;
