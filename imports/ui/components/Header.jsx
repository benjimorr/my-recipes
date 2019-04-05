import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.grey};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;

    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
`;

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);

  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.blue};
    color: white;
    text-decoration: none;
  }

  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const Header = ({ logout }) => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link to="/">MyRecipes</Link>
      </Logo>
      <Nav logout={logout} />
    </div>
  </StyledHeader>
);

Header.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Header;
