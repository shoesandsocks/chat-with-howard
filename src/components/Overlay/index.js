/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OverlayDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 260px;
  height: 200px;
  margin-left: -130px;
  margin-top: -100px;
  background-color: #fff;
  text-align: center;
  outline: 9999px solid rgba(0, 0, 0, 0.5);
`;

const RedButton = styled.button`
  background: crimson;
  color: white;
  font-size: 1em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

// https://egghead.io/lessons/react-render-elements-outside-the-current-react-tree-using-portals-in-react-16

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.overlayContainer = document.createElement('div');
    document.body.appendChild(this.overlayContainer);
  }

  componentWillUnmount() {
    document.body.removeChild(this.overlayContainer);
  }

  render() {
    return ReactDOM.createPortal(
      <OverlayDiv>
        {this.props.children}
        <RedButton onClick={this.props.onClose}>Refresh</RedButton>
      </OverlayDiv>,
      this.overlayContainer,
    );
  }
}

Overlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Overlay;
