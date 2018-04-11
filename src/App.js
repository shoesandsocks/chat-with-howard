import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Titlebar from './components/Titlebar';
import SpeechControls from './components/SpeechControls';
import OtherControls from './components/OtherControls';
import Chatbox from './components/Chatbox';

import { darkBlue } from './utils/palette';

// const url = 'https://howardchicken.herokuapp.com/howard';
const url =
  process.env.NODE_ENV === 'production'
    ? 'https://howardchicken.herokuapp.com/howard' // N.B. not original, with hyphen
    : 'http://localhost:3001/howard';
// currently failing experiment @ 'https://www.pineandvine.com/rich-text/.netlify/functions/howard'

console.log(`url is: ${url}`);

const AppWrap = styled.div`
  margin: 0;
  padding: 3em 3em 0 3em;
  height: 96vh;
  background: ${darkBlue};
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s;
  @media (max-width: 600px) {
    padding: 1em;
  }
`;

class App extends Component {
  state = {
    approvedToSpeak: false,
    voices: [],
    voice: '0',
    pitch: '1',
    rate: '1',
    newtext: '',
    conversation: [],
    markov: false,
    skipit: false,
  };

  componentDidMount() {
    this.getVoices();
  }

  getVoices() {
    const allVoices = speechSynthesis.getVoices(); // eslint-disable-line
    const voices = [];
    allVoices.forEach((v, index) => {
      if (!v.lang.match(/en/)) return null;
      return voices.push({
        name: v.name,
        lang: v.lang,
        idx: index,
      });
    });
    this.setState({ voices });
  }

  handleChange = (e) => {
    e.preventDefault();
    return this.setState({ [e.target.name]: e.target.value });
  };
  handleCheckbox = () => {
    this.setState({ markov: !this.state.markov });
  };
  handleSkipCheckbox = () => {
    this.setState({ skipit: !this.state.skipit });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { newtext } = this.state;
    if (!newtext || newtext === '') return null;
    this.setState({
      newtext: '',
      conversation: this.state.conversation.concat([
        { text: newtext, time: new Date().toString().split(' ')[4], user: true },
      ]),
    });
    if (this.state.skipit) {
      return this.speak(newtext);
    }
    const reply = await this.queryHoward(newtext);
    let text;
    try {
      if (Array.isArray(reply) && reply.length > 0) {
        const rnd = Math.floor(Math.random() * reply.length);
        text = reply[rnd].text; // eslint-disable-line
      } else if (Array.isArray(reply) && reply.length === 0) {
        // text = 'Sorry.';
        const singleton = await this.queryHoward(1, 3);
        text = singleton[0].text; // eslint-disable-line
        // line above is super-brittle. TODO: fix
      } else {
        text = reply.text; // eslint-disable-line
      }
    } catch (er) {
      text = 'Sorry?';
    }
    if (this.state.approvedToSpeak) {
      this.speak(text);
    }
    return this.setState({
      conversation: this.state.conversation.concat([
        { text, time: new Date().toString().split(' ')[4] },
      ]),
    });
  };

  approve = () => {
    if (this.state.approvedToSpeak) return this.setState({ approvedToSpeak: false, skipit: false });
    this.speak('oh kay');
    this.setState({ approvedToSpeak: true });
    this.getVoices(); // I think this is needed for Chrome to be able to populate list?
    return this.speak('hello');
  };

  speak(text) {
    const allVoices = speechSynthesis.getVoices(); // eslint-disable-line
    let currentVoice = this.state.voice;
    if (this.state.voice === '0') {
      if (this.state.voices.length === 0) return null;
      currentVoice = this.state.voices[0].idx;
    }
    const msg = new SpeechSynthesisUtterance(text); // eslint-disable-line
    msg.rate = this.state.rate;
    msg.pitch = this.state.pitch;
    msg.voice = allVoices[currentVoice];
    return speechSynthesis.speak(msg); // eslint-disable-line
  }

  /**
   * `argument` and `kindd`:
   * pass a number as arg and 1 as kindd, get that numbered ep
   * pass anything as arg and 2 as kindd, get a random ep
   * pass a number as arg and 3 as kindd, get that many random `text` quotes in an array
   * pass some text as arg an 4 as kindd, get back any matching `text` quotes in arr (or empty arr)
   * pass some text as arg an 5 as kindd, get 'markov'-type gibberish
   */
  queryHoward = (argument, kindd = null) => {
    const kind = kindd || (this.state.markov ? 5 : 4);
    const params = new URLSearchParams(); // eslint-disable-line
    params.append('kind', kind);
    params.append('argument', argument);
    return axios
      .post(url, params)
      .then((response) => {
        console.log(response.data.response); // eslint-disable-line
        return response.data.response;
      })
      .catch(e => console.log(e)); // eslint-disable-line
  };

  render() {
    const {
      approvedToSpeak,
      voices,
      voice,
      pitch,
      rate,
      conversation,
      newtext,
      markov,
      skipit,
    } = this.state;
    return (
      <AppWrap>
        <Titlebar title="Chat with Howard" />
        <SpeechControls
          approvedToSpeak={approvedToSpeak}
          voices={voices}
          voice={voice}
          pitch={pitch}
          rate={rate}
          change={this.handleChange}
          approve={this.approve}
        />
        <OtherControls
          approve={this.approve}
          approvedToSpeak={approvedToSpeak}
          skipit={skipit}
          markov={markov}
          handleSkipCheckbox={this.handleSkipCheckbox}
          handleCheckbox={this.handleCheckbox}
        />
        <Chatbox
          convo={conversation}
          newtext={newtext}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </AppWrap>
    );
  }
}

export default App;
