/* eslint-disable no-undef */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink as Link,
  Redirect,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';
import posed from 'react-pose';

import ChatWithHoward from './containers/ChatWithHoward';
import About from './containers/About';
import Nope from './containers/Nope';
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
  padding-top: 1em;
  height: 100%;
  transition: all 0.4s;
  background: white;
  width: 100px;
`;

const LinksUL = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: 'Roboto', sans-serif;
  font-size: 1em;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  padding: 70px 0 0 0.25em;
`;

const LinksLI = styled.li`
  margin-top: 1em;
  & > a {
    color: ${darkBlue};
    text-decoration: none;
    &:hover {
      color: #aaa;
    }
  }
`;

const Logout = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

class App extends React.Component {
  state = { user: null, menuIsOpen: false };

  componentDidMount() {
    // if (this.state.user !== null) return false;
    // return this.checkForUser(); // DEV
  }

  setUser = user => this.setState({ user });

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
    return false;
  };

  isAuthed = () => true; // DEV
  // const token = sessionStorage.getItem('token');
  // if (token && token !== null) {
  //   try {
  //     const user = jwtDecode(token);
  //     // TODO: test whether this works -- expressly log out if user expired
  //     if (user && user.exp < Math.floor(+new Date() / 1000)) {
  //       this.handleLogout();
  //     }
  //     if (!user || !user.exp || user.exp < Math.floor(+new Date() / 1000)) {
  //       return false;
  //     }
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // }
  // return false;

  handleLogout = () => {
    sessionStorage.setItem('token', null);
    this.setState({ user: null });
  };

  toggleMenu = () => this.setState({ menuIsOpen: !this.state.menuIsOpen });

  render() {
    const { user } = this.state;
    const PrivateRoute = ({ component: Component, authed, ...rest }) => (
      <Route
        {...rest}
        render={props => (authed ? <Component {...props} /> : <Redirect to="/login" />)}
      />
    );
    return (
      <Router>
        <StyledSlider pose={this.state.menuIsOpen ? 'open' : 'closed'}>
          <Menu>
            <LinksUL>
              <LinksLI>
                <Link exact activeStyle={{ color: orange }} to="/">
                Home
                </Link>
              </LinksLI>
              <LinksLI>
                <Link activeStyle={{ color: orange }} to="/about">
                About
                </Link>
              </LinksLI>
              {!user && (
              <LinksLI>
                <Link activeStyle={{ color: orange }} to="/login">
                Login
                </Link>
              </LinksLI>
                )}
              {user && (
              <LinksLI>
                <Link activeStyle={{ color: orange }} to="/members">
                      Members
                </Link>
              </LinksLI>
                )}
              {user && (
              <LinksLI>
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
              </LinksLI>
                )}
            </LinksUL>
          </Menu>
          <Page>
            <Header user={user} toggleMenu={this.toggleMenu} />
            <Switch>
              <Route exact path="/" component={ChatWithHoward} />
              <Route path="/about" component={About} />
              <Route path="/chat" component={ChatWithHoward} />
              <Route path="/login" render={() => <LoginPage setUser={this.setUser} />} />
              <PrivateRoute
                component={() => <MembersOnly user={user} />}
                authed={this.isAuthed()}
                path="/members"
              />
              <Route component={Nope} />
            </Switch>
          </Page>
        </StyledSlider>
      </Router>
    );
  }
}

export default App;
