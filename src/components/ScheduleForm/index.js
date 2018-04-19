import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

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
    // get ID from token
    const { tumblr_id } = this.props;
    const token = sessionStorage.getItem('token'); // eslint-disable-line
    this.setState({ isLoading: true, message: null });
    return axios
      .post('/howardcron', { data: { tumblr_id } }, { headers: { token } }) // TODO: right? uri, options, data?
      .then((response) => {
        console.log(response.data);

        this.setState({ userCronJobs: response.data.usersJobs, isLoading: false });
      })
      .catch((e) => {
        console.log('something went wrong in getCrons: ', e); // eslint-disable-line
        this.setState({ message: e });
      });
  };
  render() {
    const { tumblr_id } = this.props;
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
        <p>id: {tumblr_id}</p>
        <p>number of jobs: {userCronJobs.length}</p>
      </FormWrap>
    );
  }
}

ScheduleForm.propTypes = {
  tumblr_id: PropTypes.string.isRequired,
};

export default ScheduleForm;
