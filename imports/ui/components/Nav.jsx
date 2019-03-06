import React from 'react';
import { Link } from 'react-router-dom';
import NavStyles from '../styles/NavStyles';

const Nav = () => (
  <NavStyles>
    <Link to="/recipes">All Recipes</Link>
    <Link to="/recipes/new">Add Recipe</Link>
  </NavStyles>
);

export default Nav;
