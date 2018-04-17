import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Navicon from '../Navicon';

import { darkBlue } from '../../utils/palette';

const HeaderWrap = styled.div`
  background: ${darkBlue};
  padding: 1em 0 0 3em;
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    padding: 1em;
  }
  & > span {
    margin-left: 1em;
    color: white;
  }
  & > img {
    width: 3em;
    height: 3em;
    border-radius: 6px;
    margin-left: 1em;
  }
`;

const Header = (props) => {
  const {
    action,
    active,
    user: { name, avi },
  } = props;
  return (
    <HeaderWrap>
      <Navicon action={action} active={active} />
      {name && <span>{name}</span>}
      {name && <img src={avi} alt="avatar" />}
    </HeaderWrap>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    avi: PropTypes.string,
  }).isRequired,
  action: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Header;
