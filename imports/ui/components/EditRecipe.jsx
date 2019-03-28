import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Form from '../styles/Form';

import { Recipes } from '../../api/recipes/recipes';

class EditRecipe extends TrackerReact(Component) {
  state = {
    title: '',
    url: '',
    comments: '',
    loading: false,
    error: '',
    subscription: {
      recipe: Meteor.subscribe('singleRecipe', this.props.recipeId)
    }
  };

  componentWillUnmount() {
    this.state.subscription.recipe.stop();
  }

  recipe = () => {
    const { recipeId } = this.props;
    return Recipes.findOne(recipeId);
  };

  render() {
    const { recipeId } = this.props;
    const recipe = this.recipe();

    if (!recipe) {
      return <p>{`No recipe found with ID ${recipeId}.`}</p>;
    } else {
      const { title } = recipe;

      return (
        <div>
          <h3>Editing Recipe: {title}</h3>
        </div>
      );
    }
  }
}

EditRecipe.propTypes = {
  recipeId: PropTypes.string.isRequired
};

export default EditRecipe;
