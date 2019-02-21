import React from 'react';
import PropTypes from 'prop-types';

const Recipes = props => (
  <div>
    {props.recipes.map(recipe => (
      <div key={recipe._id}>
        <h3>{recipe.title}</h3>
        <a href={recipe.url}>View Recipe</a>
      </div>
    ))}
  </div>
);

Recipes.propTypes = {
  recipes: PropTypes.array
};

Recipes.defaultProps = {
  recipes: []
};

export default Recipes;
