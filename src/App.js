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

import ChatWithHoward from './containers/ChatWithHoward';
import About from './containers/About';
import Nope from './containers/Nope';
import MembersOnly from './containers/MembersOnly';
import LoginPage from './components/LoginPage';
import Header from './components/Header';

import { darkBlue, orange } from './utils/palette';

const MenuAndPage = styled.div`
  display: flex;
  min-height: 100%;
`;

const Menu = styled.div`
  opacity: ${props => (props.isOpen ? '1' : '0')};
  padding-top: 1em;
  transition: all 0.4s;
  background: white;
  position: absolute;
  /* width: 80px; N.B.: width controlled in Page element by translate3d */
`;

const Page = styled.div`
  height: 100%;
  flex: 2;
  transform: ${props => (props.isOpen ? 'translate3d(80px,0,0)' : 'translate3d(0, 0, 0)')};
  transition: transform 0.3s;
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
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: true,
      user: null,
    };
  }
  componentDidMount() {
    this.checkForUser();
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

  isAuthed = () => {
    const token = sessionStorage.getItem('token');
    if (token && token !== null) {
      try {
        const user = jwtDecode(token);
        if (!user || !user.exp || user.exp < Math.floor(+new Date() / 1000)) {
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  };

  handleLogout = () => {
    sessionStorage.setItem('token', null);
    this.setState({ user: null });
  };

  toggleMenu = () => this.setState({ menuIsOpen: !this.state.menuIsOpen });

  render() {
    const { user, menuIsOpen } = this.state;
    const PrivateRoute = ({ component: Component, authed, ...rest }) => (
      <Route
        {...rest}
        render={props => (authed ? <Component {...props} /> : <Redirect to="/login" />)}
      />
    );
    return (
      <Router>
        <div style={{ overflowX: 'hidden' }}>
          <MenuAndPage>
            <Menu isOpen={menuIsOpen} toggle={this.toggleMenu}>
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
            <Page isOpen={menuIsOpen}>
              <Header user={user} active={menuIsOpen} action={this.toggleMenu} />
              <Switch>
                <Route exact path="/" render={() => <ChatWithHoward />} />
                <Route path="/about" render={() => <About />} />
                <Route path="/chat" render={() => <ChatWithHoward />} />
                <Route path="/login" render={() => <LoginPage setUser={this.setUser} />} />
                <PrivateRoute
                  component={() => <MembersOnly user={user} />}
                  authed={this.isAuthed()}
                  path="/members"
                />
                <Route component={Nope} />
              </Switch>
            </Page>
          </MenuAndPage>
        </div>
      </Router>
    );
  }
}

export default App;
