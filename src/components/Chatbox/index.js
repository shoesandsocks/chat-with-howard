import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Timestamp from './Timestamp';

const Box = styled.form`
  margin: 1em 0;
  padding: 8px 0 0 4px;
  width: 100%;
  max-width: 1000px;
  border: 4px solid white;
  height: 400px;
  background: black;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: orange;
  }
  /* apparently there's no moz equivalent, so it just sucks a little on FF */
`;

const ChatWrap = styled.div`
  min-height: 30px;
  margin-top: 0.125em;
  margin-bottom: 0.125em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: ${props => props.align};
`;

const Chat = styled.div`
  max-width: 60%;
  border-radius: 7px;
  background-color: ${props => props.bg};
  @media (max-width: 600px) {
    max-width: 70%;
  }
`;

const Text = styled.p`
  padding: 0.25em;
  margin: 0;
  color: white;
  font-size: 1.25em;
  font-family: 'Inconsolata', serif;
  overflow-wrap: break-word;
`;

const NewText = styled.input`
  width: 95%;
  background: black;
  color: white;
  border: none;
  font-size: 1.25em;
  height: 1.5em;
  font-family: 'Inconsolata', serif;
  cursor: pointer;
  outline: none;
  padding-left: 4px;
  @media (max-width: 600px) {
    width: 90%;
  }
`;

const renderConvo = (convo) => {
  const clone = convo.slice(0).reverse();
  return clone.map((c, i) => (
    <ChatWrap key={i} align={c.user ? 'flex-start' : 'flex-end'}>
      {c.user && <Timestamp time={c.time} />}
      <Chat key={`${c}`} bg={c.user ? '#FFA500' : '#aaa'}>
        <Text>{c.text}</Text>
      </Chat>
      {!c.user && <Timestamp time={c.time} />}
    </ChatWrap>
  ));
};

const Chatbox = ({
  handleSubmit, handleChange, newtext, convo, keywatch,
}) => (
  <Box onSubmit={handleSubmit}>
    <label style={{ color: 'white' }} htmlFor="newtext">
      &gt;
      <NewText onKeyUp={keywatch} type="text" name="newtext" id="newtext" value={newtext} onChange={handleChange} />
    </label>
    {renderConvo(convo)}
  </Box>
);

Chatbox.propTypes = {
  convo: PropTypes.array.isRequired, // eslint-disable-line
  newtext: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  keywatch: PropTypes.func.isRequired,
};

export default Chatbox;
