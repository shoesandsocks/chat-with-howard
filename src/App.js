import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import styled from 'styled-components';

import ChatWithHoward from './containers/ChatWithHoward';
import About from './containers/About';
import Nope from './containers/Nope';

import { darkBlue } from './utils/palette';

const Header = styled.div`
  background: ${darkBlue};
  padding: 1em 3em;
`;

const LinksUL = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: 'Roboto', sans-serif;
  font-size: 1em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const LinksLI = styled.li`
  & > a {
    color: white;
    text-decoration: none;
    &:hover {
      color: #aaa;
    }
  }
`;

const App = () => (
  <Router>
    <div>
      <Header>
        <LinksUL>
          <LinksLI>
            <Link to="/">Home</Link>
          </LinksLI>
          <LinksLI>
            <Link to="/about">About</Link>
          </LinksLI>
        </LinksUL>
      </Header>
      <Switch>
        <Route exact path="/" component={ChatWithHoward} />
        <Route path="/chat" component={ChatWithHoward} />
        <Route path="/about" component={About} />
        <Route component={Nope} />
      </Switch>
    </div>
  </Router>
);

export default App;
