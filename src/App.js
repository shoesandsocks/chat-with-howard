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
const defaultUser = {
  name: null,
  avi: null,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: true,
      user: defaultUser,
    };
  }
  componentDidMount() {
    this.checkForUser();
  }

  setUser = user => this.setState({ user });

  checkForUser = () => {
    if (this.state.user.name) return null;
    const token = sessionStorage.getItem('token');
    if (token && token !== null) {
      try {
        let user = jwtDecode(token);
        if (!user || !user.exp || user.exp < Math.floor(+new Date() / 1000)) {
          user = defaultUser;
        }
        return this.setState({ user });
      } catch (e) {
        return this.setState({ user: defaultUser });
      }
    }
    return null;
  };

  handleLogout = () => {
    sessionStorage.setItem('token', null);
    this.setState({ user: defaultUser });
  };

  toggleMenu = () => this.setState({ menuIsOpen: !this.state.menuIsOpen });

  render() {
    const { user, menuIsOpen } = this.state;
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props => (user.name ? <Component {...props} /> : <Redirect to="/" />)}
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
                <Link activeStyle={{ color: orange }} to="/about">
                  About
                </Link>
                {!user.name && (
                  <LinksLI>
                    <Link activeStyle={{ color: orange }} to="/login">
                      Login
                    </Link>
                  </LinksLI>
                )}
                {user.name && (
                  <LinksLI>
                    <Link activeStyle={{ color: orange }} to="/members">
                      Members
                    </Link>
                  </LinksLI>
                )}
                {user.name && (
                  <LinksLI>
                    <button onClick={this.handleLogout}>Logout</button>
                  </LinksLI>
                )}
              </LinksUL>
            </Menu>
            <Page isOpen={menuIsOpen}>
              <Header user={user} active={menuIsOpen} action={this.toggleMenu} />
              <Switch>
                <Route exact path="/" render={() => <ChatWithHoward toggle={this.toggleMenu} />} />
                <Route path="/about" render={() => <About toggle={this.toggleMenu} />} />
                <Route path="/chat" render={() => <ChatWithHoward toggle={this.toggleMenu} />} />
                <Route path="/login" render={() => <LoginPage user={user} setUser={setUser} />} />
                <PrivateRoute
                  component={() => <MembersOnly user={user} toggle={this.toggleMenu} />}
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
