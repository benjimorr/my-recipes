import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Form from '../styles/Form';
import CheckBox from './CheckBox';
import Tag from './Tag';
import checkboxes from '../../../lib/tagsCheckboxes';

import { Recipes } from '../../api/recipes/recipes';

class EditRecipe extends Component {
  state = {
    title: '',
    currentIngredient: '',
    mainIngredients: [],
    tags: new Map(),
    url: '',
    comments: '',
    loading: false,
    error: ''
  };

  componentDidMount() {
    const { recipeId } = this.props;
    const recipeDocument = Recipes.findOne(recipeId);
    this.setState({ ...recipeDocument });
  }

  render() {
    return (
      <div>
        <p>Editing recipe</p>
      </div>
    );
  }
}

EditRecipe.propTypes = {
  recipeId: PropTypes.string.isRequired
};

export default EditRecipe;
