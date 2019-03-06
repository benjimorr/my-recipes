import React from 'react';
import PropTypes from 'prop-types';

const Recipes = props => (
  <div>
    {props.recipes.map(recipe => (
      <div key={recipe._id}>
        <h2>{recipe.title}</h2>
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
