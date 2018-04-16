import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { orange } from '../../utils/palette';

const OtherControlsForm = styled.form`
  padding: 0.5em;
  width: 100%;
  max-width: 1000px;
  height: 20px;
  text-align: center;
  transition: all 0.3s;
  @media (max-width: 600px) {
    margin-top: 5em;
  }
`;

const ControlRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 600px) {
    /* flex-flow: column wrap;
    justify-content: flex-start;
    align-items: flex-end; */
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

const Checkbox = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 2em;
  width: 2em;
  margin-left: 0.25em;
  background: white;
  border: 3px solid ${orange};
  border-radius: 50%;
  &:checked {
    background: ${orange};
  }
`;

const OtherControls = ({
  skipit, markov, handleCheckbox, handleSkipCheckbox, approvedToSpeak,
}) => (
  <OtherControlsForm>
    <ControlRow>
      <ControlLabel>
        Markov?
        <Checkbox
          type="checkbox"
          checked={markov}
          id="markov"
          name="markov"
          onClick={handleCheckbox}
        />
      </ControlLabel>

      {approvedToSpeak && (
        <ControlLabel>
          Forget Howard:
          <Checkbox
            type="checkbox"
            checked={skipit}
            id="skipit"
            name="skipit"
            onClick={handleSkipCheckbox}
          />
        </ControlLabel>
      )}
    </ControlRow>
  </OtherControlsForm>
);

OtherControls.propTypes = {
  handleSkipCheckbox: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  markov: PropTypes.bool.isRequired,
  skipit: PropTypes.bool.isRequired,
  approvedToSpeak: PropTypes.bool.isRequired,
};

export default OtherControls;
