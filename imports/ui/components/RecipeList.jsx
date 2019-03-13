import React from 'react';
import PropTypes from 'prop-types';
import RecipeListStyles from '../styles/RecipeListStyles';
import RecipeListItem from '../styles/RecipeListItem';

function formatTitle(title) {
  return title.length < 40 ? title : `${title.slice(0, 39)}...`;
}

const RecipeList = props => (
  <RecipeListStyles>
    {props.recipes.map(recipe => (
      <RecipeListItem key={recipe._id}>
        <h2 title={recipe.title}>{formatTitle(recipe.title)}</h2>
        <a href={recipe.url}>View Recipe</a>
      </RecipeListItem>
    ))}
  </RecipeListStyles>
);

RecipeList.propTypes = {
  recipes: PropTypes.array
};

RecipeList.defaultProps = {
  recipes: []
};

export default RecipeList;
