import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { orange } from '../../utils/palette';

const OverlayForm = styled.form`
  height: 80%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  margin: 0.25em;
  width: 80%;
  font: 1.125em 'Inconsolata', sans-serif;
`;
const Select = styled.select`
  margin: 0.25em;
  width: 80%;
  font: 1.125em 'Inconsolata', sans-serif;
`;

const Button = styled.button`
  background: ${props => props.buttonColor};
  color: white;
  font-size: 1em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin: 1em;
`;
const CloseButton = styled.button`
  align-self: flex-end;
  background: transparent;
  border: none;
  position: absolute;
  top: 0;
  cursor: pointer;
`;

const EditorOverlay = ({
  editChannelName,
  editCron,
  editJobName,
  cronServerRequest,
  originalName,
  handleEditChange,
  channels,
  adding,
  closeWithNoAction,
}) => {
  const renderOptions = array =>
    array.map(channel => (
      <option value={channel.name} key={channel.id}>
        {channel.name}
      </option>
    ));

  return (
    <OverlayForm onSubmit={null}>
      {adding && <p>Add new job...</p>}
      {!adding && <p>Edit this job, or</p>}
      <Button buttonColor="crimson" onClick={() => cronServerRequest('delete', originalName)}>
        {adding ? 'Close' : 'Delete'}
      </Button>
      <CloseButton onClick={closeWithNoAction}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill={orange}
            d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
          />
        </svg>
      </CloseButton>
      <Input
        type="text"
        name="editJobName"
        id="editJobName"
        placeholder="job name"
        value={editJobName}
        onChange={handleEditChange}
      />
      <Input
        type="text"
        name="editCron"
        id="editCron"
        placeholder="cron value"
        value={editCron}
        onChange={handleEditChange}
      />
      <Select
        name="editChannelName"
        id="editChannelName"
        value={editChannelName}
        onChange={handleEditChange}
      >
        {channels.length > 0 && renderOptions(channels)}
      </Select>
    </OverlayForm>
  );
};

EditorOverlay.propTypes = {
  editChannelName: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf(PropTypes.object).isRequired, // TODO: beef up?
  editCron: PropTypes.string.isRequired,
  editJobName: PropTypes.string.isRequired,
  originalName: PropTypes.string.isRequired,
  cronServerRequest: PropTypes.func.isRequired,
  handleEditChange: PropTypes.func.isRequired,
  closeWithNoAction: PropTypes.func.isRequired,
  adding: PropTypes.bool.isRequired,
};

export default EditorOverlay;
