import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavStyles from '../styles/NavStyles';

const Nav = ({ logout }) => (
  <NavStyles>
    <Link to="/recipes">All Recipes</Link>
    <Link to="/recipes/new">Add Recipe</Link>
    {Meteor.userId() && (
      <button type="button" onClick={logout}>
        Logout
      </button>
    )}
  </NavStyles>
);

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Nav;
