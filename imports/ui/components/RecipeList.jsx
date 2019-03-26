import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeListStyles from '../styles/RecipeListStyles';
import RecipeListItem from '../styles/RecipeListItem';

function formatTitle(title) {
  return title.length < 40 ? title : `${title.slice(0, 39)}...`;
}

const RecipeList = props => (
  <RecipeListStyles>
    {(() => {
      if (!props.recipes.length) return <p>No Recipes Found</p>;

      return props.recipes.map(recipe => {
        const { _id, title, url, mainIngredients, comments } = recipe;

        return (
          <RecipeListItem key={_id}>
            <h3 title={title}>{formatTitle(title)}</h3>
            <div className="recipeIngredients">
              <h5>Main Ingredients</h5>
              {mainIngredients
                .map(
                  ingredient =>
                    ingredient.charAt(0).toUpperCase() + ingredient.slice(1)
                )
                .join(', ')}
            </div>
            <p>{comments}</p>
            <div className="buttonList">
              <a href={url} target="_blank">
                View Recipe
              </a>
              <Link to={`/recipes/edit/${_id}`}>Edit Recipe</Link>
            </div>
          </RecipeListItem>
        );
      });
    })()}
  </RecipeListStyles>
);

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
};

RecipeList.defaultProps = {
  recipes: []
};

export default RecipeList;
