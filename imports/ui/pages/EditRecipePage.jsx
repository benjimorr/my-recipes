import React from 'react';
import PropTypes from 'prop-types';
import EditRecipeContainer from '../containers/EditRecipeContainer';

const EditRecipePage = ({
  match: {
    params: { recipeId = '' },
  },
}) => (
  <div>
    <h1>Edit Recipe</h1>
    <EditRecipeContainer recipeId={recipeId} />
  </div>
);

EditRecipePage.propTypes = {
  match: PropTypes.object,
};

export default EditRecipePage;
