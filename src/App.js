/* eslint-disable no-undef */
import React from 'react';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';
import posed from 'react-pose';

import ChatWithHoward from './containers/ChatWithHoward';
import About from './containers/About';
import MembersOnly from './containers/MembersOnly';
import LoginPage from './components/LoginPage';
import Header from './components/Header';

import { darkBlue, orange } from './utils/palette';

const config = {
  closed: {
    left: '-100px',
  },
  open: {
    left: 0,
    delay: 300,
  },
};

const Slider = posed.div(config);
const StyledSlider = styled(Slider)`
  position: absolute;
  overflow-x: hidden;
  display: flex;
`;

const Page = styled.div`
  width: 100vw;
  position: relative;
`;

const Menu = styled.div`
  position: relative;
  height: 100%;
  transition: all 0.4s;
  background: white;
  width: 100px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  padding: 70px 0 0 0.25em;
`;

const MenuBtn = styled.button`
  border: none;
  background: transparent;
  font-size: 1em;
  margin-top: 1em;
  color: ${props => (props.active ? orange : darkBlue)};
  cursor: pointer;
  &:hover {
      color: ${orange};
    }
`;

const Logout = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

class App extends React.Component {
  state = { user: null, menuIsOpen: false, CurrentComponent: ChatWithHoward };

  componentDidMount() {
    this.checkForUser();
    if (this.state.user !== null) return false;
    try {
      const url = new URL(window.location);
      const params = new URLSearchParams(url.search);
      const token = params.get('token');
      if (token && token !== null) {
        this.setUser(jwtDecode(token), 'cdm');
        sessionStorage.setItem('token', token);
      }
    } catch (e) {
      console.log("Didn't see token.", e); // eslint-disable-line
    }
    return window.history.replaceState(null, null, window.location.pathname);
    // return this.checkForUser(); // DEV
  }

  setUser = (user, option) => {
    if (option === 'cdm') {
      return this.setState({ user, CurrentComponent: MembersOnly });
    }
    return this.setState({ user });
  }

  checkForUser = () => {
    const token = sessionStorage.getItem('token');
    if (token && token !== null) {
      try {
        let user = jwtDecode(token);
        if (!user || !user.exp || user.exp < Math.floor(+new Date() / 1000)) {
          user = null;
        }
        return this.setState({ user });
      } catch (e) {
        return console.log('catch in App cFU: ', e); // eslint-disable-line
      }
    }
    return null;
  };

  isAuthed = () => { // DEV
    const token = sessionStorage.getItem('token');
    if (token && token !== null) {
      try {
        const user = jwtDecode(token);
        // TODO: test whether this works -- expressly log out if user expired
        if (user && user.exp < Math.floor(+new Date() / 1000)) {
          this.handleLogout();
        }
        if (!user || !user.exp || user.exp < Math.floor(+new Date() / 1000)) {
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  handleLogout = () => {
    sessionStorage.setItem('token', null);
    this.setState({ user: null, CurrentComponent: ChatWithHoward });
  };

  toggleMenu = () => this.setState({ menuIsOpen: !this.state.menuIsOpen });

  changeComponent = (string) => {
    if (string === 'Home') return this.setState({ CurrentComponent: ChatWithHoward });
    if (string === 'About') return this.setState({ CurrentComponent: About });
    if (string === 'Login') return this.setState({ CurrentComponent: LoginPage });
    if (string === 'Members') return this.setState({ CurrentComponent: MembersOnly });
    return false;
  }

  render() {
    const { user, CurrentComponent } = this.state;
    return (
      <StyledSlider pose={this.state.menuIsOpen ? 'open' : 'closed'}>
        <Menu>
          <MenuBtn active={this.state.CurrentComponent === ChatWithHoward} onClick={() => this.changeComponent('Home')}>Home</MenuBtn>
          <MenuBtn active={this.state.CurrentComponent === About} onClick={() => this.changeComponent('About')}>About</MenuBtn>
          {!user && (
          <MenuBtn active={this.state.CurrentComponent === LoginPage} onClick={() => this.changeComponent('Login')}>Login</MenuBtn>
            )}
          {user && (
          <MenuBtn active={this.state.CurrentComponent === MembersOnly} onClick={() => this.changeComponent('Members')}>Members</MenuBtn>
            )}
          {user && (
          <Logout onClick={this.handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill={orange}
                d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              />
            </svg>
          </Logout>
          )}
        </Menu>
        <Page>
          <Header user={user} toggleMenu={this.toggleMenu} />
          <CurrentComponent />
        </Page>
      </StyledSlider>
    );
  }
}

export default App;
