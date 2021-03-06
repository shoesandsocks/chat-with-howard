import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Overlay from '../Overlay';
import EditorOverlay from '../EditorOverlay';

import { darkBlue, orange } from '../../utils/palette';

const FormWrap = styled.div`
  width: 67%;
  padding: 1em;
  min-height: 20em;
  background: ${darkBlue};
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 600px) {
    width: 85%;
  }
`;
const TableTitle = styled.p`
  font: 1em 'Roboto', sans-serif;
  align-self: flex-start;
`;

const Table = styled.table`
  font-family: 'Inconsolata', sans-serif;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  border-bottom: 1px solid #ddd;
  @media (max-width: 600px) {
  }
`;
const THead = styled.thead`
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
`;

const TableRs = styled.tr`
  display: table-row;
  vertical-align: inherit;
  border-bottom: 1px solid #ddd;
  border-color: inherit;
  &:hover {
    & > td {
      background: #b9c9fe;
    }
  }
`;

const TableHs = styled.th`
  font-size: 24px;
  font-weight: normal;
  background: #b9c9fe;
  border-top: 4px solid #aabcfe;
  border-bottom: 1px solid white;
  color: #039;
  padding: 8px;
  &:first-child {
    width: 40%;
  }
  &:nth-child(2) {
    width: 28%;
  }
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const TableDs = styled.td`
  background: #e8edff;
  border-bottom: 1px solid white;
  color: #669;
  border-top: 1px solid transparent;
  padding: 8px;
  overflow: hidden;
  transition: all 0.3s;
  &:first-child {
    width: 40%;
  }
  &:nth-child(2) {
    width: 25%;
  }
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const AddBtn = styled.button`
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 1em 2em;
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

class ScheduleForm extends Component {
  state = {
    overlayIsOpen: false,
    originalCron: {},
    editCron: '',
    editChannelName: ' - Select One - ',
    editJobName: '',
    adding: false,
  };
  handleOpenEditor = (job) => {
    this.setState({
      overlayIsOpen: true,
      originalCron: job,
      editCron: job.cronSked,
      editChannelName: job.channelName,
      editJobName: job.jobName,
    });
  };

  addNewJob = () => {
    this.setState({
      overlayIsOpen: true,
      adding: true,
    });
  };

  closeWithNoAction = (e) => {
    if (e) e.preventDefault();
    return this.setState({
      overlayIsOpen: false,
      editCron: '',
      editJobName: '',
      editChannelName: ' - Select One - ',
      originalCron: {},
      adding: false,
    });
  };

  handleEditChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDelete = (jobName) => {
    this.props.cronServerRequest('delete', jobName);
    this.closeWithNoAction();
  };

  closeOverlay = () => {
    if (this.state.editChannelName === ' - Select One - ') {
      console.log('pick a real channel'); // eslint-disable-line
      return null;
    }
    const potentialJob = {
      jobName: this.state.editJobName,
      channelName: this.state.editChannelName,
      cronSked: this.state.editCron,
    };
    if (this.state.adding) {
      this.props.cronServerRequest('add', potentialJob);
    } else if (
      Object.values(potentialJob).sort() !== Object.values(this.state.originalCron).sort()
    ) {
      this.props.cronServerRequest('delete', this.state.originalCron.jobName);
      setTimeout(() => {
        this.props.cronServerRequest('add', potentialJob);
      }, 500);
    }
    return this.closeWithNoAction();
  };

  renderJobs = array =>
    array.map(job => (
      <TableRs key={job.jobName} onClick={() => this.handleOpenEditor(job)}>
        <TableDs>{job.jobName}</TableDs>
        <TableDs>{job.cronSked}</TableDs>
        <TableDs>{job.channelName}</TableDs>
      </TableRs>
    ));

  render() {
    const {
      userCronJobs, isFormLoading, message, channels,
    } = this.props;
    if (isFormLoading) {
      return (
        <FormWrap>
          loading...
          {message && <span>...but something went wrong: {message}</span>}
        </FormWrap>
      );
    }
    if (this.state.overlayIsOpen) {
      const {
        editCron, editJobName, editChannelName, adding, originalCron,
      } = this.state;
      return (
        <Overlay onClose={this.closeOverlay} buttonName="Save" buttonColor={orange}>
          <EditorOverlay
            adding={adding}
            channels={channels}
            editCron={editCron}
            editJobName={editJobName}
            editChannelName={editChannelName}
            originalName={adding ? {} : originalCron.jobName}
            handleDelete={this.handleDelete}
            handleEditChange={this.handleEditChange}
            closeWithNoAction={this.closeWithNoAction}
          />
        </Overlay>
      );
    }
    return (
      <FormWrap>
        <TableTitle>You have {userCronJobs.length} jobs. Tap to edit or delete.</TableTitle>
        <Table>
          <THead>
            <TableRs>
              <TableHs>Job</TableHs>
              <TableHs>Schedule</TableHs>
              <TableHs>Channel</TableHs>
            </TableRs>
          </THead>
          <tbody>{this.renderJobs(userCronJobs)}</tbody>
        </Table>
        <AddBtn onClick={this.addNewJob}>Add</AddBtn>
      </FormWrap>
    );
  }
}

ScheduleForm.propTypes = {
  channels: PropTypes.array.isRequired, // eslint-disable-line
  cronServerRequest: PropTypes.func.isRequired,
  userCronJobs: PropTypes.object.isRequired, // eslint-disable-line
  isFormLoading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default ScheduleForm;
