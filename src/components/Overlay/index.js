/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OverlayDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 300px;
  margin-left: -200px;
  margin-top: -150px;
  background-color: #fff;
  text-align: center;
  outline: 9999px solid rgba(0, 0, 0, 0.5);
`;

const Button = styled.button`
  background: ${props => props.buttonColor};
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
        <Button buttonColor={this.props.buttonColor} onClick={this.props.onClose}>
          {this.props.buttonName}
        </Button>
      </OverlayDiv>,
      this.overlayContainer,
    );
  }
}

Overlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  buttonName: PropTypes.string,
  buttonColor: PropTypes.string,
};

Overlay.defaultProps = {
  buttonName: 'Refresh',
  buttonColor: 'crimson',
};

export default Overlay;
