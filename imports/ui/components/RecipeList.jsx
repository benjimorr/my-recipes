import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import RecipeListStyles from '../styles/RecipeListStyles';
import RecipeListItem from '../styles/RecipeListItem';

import { Recipes } from '../../api/recipes/recipes';

function formatTitle(title) {
  return title.length < 40 ? title : `${title.slice(0, 39)}...`;
}

class RecipeList extends TrackerReact(Component) {
  state = {
    subscription: {
      recipes: Meteor.subscribe('allRecipes')
    }
  };

  componentWillUnmount() {
    this.state.subscription.recipes.stop();
  }

  recipes = () => Recipes.find().fetch();

  render() {
    const recipes = this.recipes();

    return (
      <RecipeListStyles>
        {(() => {
          if (!recipes.length) return <p>No Recipes Found</p>;

          return recipes.map(recipe => {
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
  }
}

export default RecipeList;
