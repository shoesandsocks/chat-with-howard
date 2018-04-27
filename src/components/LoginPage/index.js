/* eslint-disable no-undef */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

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
  componentDidMount() {
    try {
      const url = new URL(window.location);
      const params = new URLSearchParams(url.search);
      const token = params.get('token');
      if (token && token !== null) {
        this.props.setUser(jwtDecode(token));
        sessionStorage.setItem('token', token);
        window.location.replace(`${url.origin}/members`);
      }
      return false;
    } catch (e) {
      console.log("Login page didn't see token.", e); // eslint-disable-line
    }
    return false;
  }

  render() {
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
  setUser: PropTypes.func.isRequired,
};

export default LoginPage;
