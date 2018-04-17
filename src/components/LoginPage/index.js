/* eslint-disable no-undef */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { darkBlue } from '../../utils/palette';

const LoginWrap = styled.div`
  height: 99vh;
  width: 100%;
  padding-top: 3em;
  background: ${darkBlue};
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const Text = styled.p`
  font-size: 1rem;
  color: white;
`;

const uri = 'https%3A%2F%2Fhowardchicken.herokuapp.com%2Foauth';
const cli = '11083475395.188120798310';
const scope = 'identity.basic,identity.avatar';
const link = `https://slack.com/oauth/authorize?scope=${scope}&client_id=${cli}&redirect_uri=${uri}`;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor in LoginPage', props);
  }

  componentDidMount() {
    this.props.toggle();
    try {
      const url = new URL(window.location);
      const params = new URLSearchParams(url.search);
      const token = params.get('token');
      if (token) {
        sessionStorage.setItem('token', token);
        window.location.replace(`${url.origin}/members`);
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.props.user) {
      return window.location.replace(`${url.origin}/members`);
    }
    return (
      <LoginWrap>
        <Text>Sign in with your Tumblrrs Slack account</Text>
        <a href={link}>
          <img
            style={{ marginTop: '1em' }}
            alt="Sign in with Slack"
            height="40"
            width="172"
            src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
            srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
          />
        </a>
      </LoginWrap>
    );
  }
}

LoginPage.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default LoginPage;
