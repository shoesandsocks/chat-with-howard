import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { darkBlue } from '../../utils/palette';

const ControlsForm = styled.form`
  width: 100%;
  max-width: 1000px;
  height: 200px;
  text-align: center;
`;
// same style but div not form
const BtnWrap = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 200px;
  text-align: center;
`;

const AllowBtn = styled.button`
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 1em;
  margin-top: 1em;
  background: transparent;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: white;
    color: ${darkBlue};
  }
`;

const ControlLabel = styled.label`
  height: 50px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8em;
`;

const ControlRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`;

const Slider = styled.input`
  width: 80%;
  outline: none;
  padding: 0;
  margin: 0;
  -webkit-appearance: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 4em;
    height: 4em;
    margin-top: -16px;
    border-radius: 50%;
    background: white;
    border: 8px solid orange;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background: orange;
    }
  }
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    width: 98%;
    height: 1em;
    background: white;
    border-radius: 50%;
  }
  &::-moz-range-thumb {
    width: 3em;
    height: 3em;
    border-radius: 50%;
    border: 8px solid orange;
    transition: 0.2s;
    &:hover {
      background: orange;
    }
  }
  &::-moz-range-track {
    width: 100%;
    height: 1em;
    background: white;
    border: none;
    border-radius: 8px;
  }
`;

const Value = styled.p`
  width: 20px;
`;

const VoiceSelect = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 200px;
  margin: 50px;
  width: 150px;
  padding: 5px 35px 5px 5px;
  font-size: 1em;
  color: white;
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 34px;
`;

class SpeechControls extends React.Component {
  renderOptions() {
    return this.props.voices.map(v => (
      <option name={v.name} value={v.idx} key={v.idx}>
        {v.name} - {v.lang}
      </option>
    ));
  }
  render() {
    const {
      rate, change, voice, voices, pitch, approvedToSpeak, approve,
    } = this.props;
    if (!approvedToSpeak) {
      return (
        <BtnWrap>
          <AllowBtn onClick={approve}>allow speech</AllowBtn>
        </BtnWrap>
      );
    }
    return (
      <ControlsForm>
        {approvedToSpeak && <AllowBtn onClick={approve}>cancel speech</AllowBtn>}
        <ControlLabel htmlFor="rate">
          <Value>Rate</Value>
          <Slider
            onChange={change}
            type="range"
            min="0.5"
            max="2"
            value={rate}
            step="0.1"
            id="rate"
            name="rate"
          />
          <Value>{rate}</Value>
        </ControlLabel>

        <ControlLabel htmlFor="pitch">
          <Value>Pitch</Value>
          <Slider
            onChange={change}
            type="range"
            min="0"
            max="2"
            value={pitch}
            step="0.1"
            id="pitch"
            name="pitch"
          />
          <Value>{pitch}</Value>
        </ControlLabel>

        <ControlRow>
          {/* this row-wrap currently unnec */}
          <ControlLabel style={{ justifyContent: 'flex-start' }} htmlFor="voice">
            <Value>Voice</Value>
            <VoiceSelect name="voice" id="voice" value={voice} onChange={change}>
              {voices && this.renderOptions()}
            </VoiceSelect>
          </ControlLabel>
        </ControlRow>
      </ControlsForm>
    );
  }
}

SpeechControls.propTypes = {
  rate: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  approve: PropTypes.func.isRequired,
  voice: PropTypes.string.isRequired,
  voices: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    lang: PropTypes.string,
    idx: PropTypes.number,
  })).isRequired,
  pitch: PropTypes.string.isRequired,
  approvedToSpeak: PropTypes.bool.isRequired,
};

export default SpeechControls;
