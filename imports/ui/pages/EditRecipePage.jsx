import React from 'react';
import EditRecipeContainer from '../containers/EditRecipeContainer';

const EditRecipePage = ({
  match: {
    params: { recipeId }
  }
}) => (
  <div>
    <h1>Edit Recipe</h1>
    <EditRecipeContainer recipeId={recipeId} />
  </div>
);

export default EditRecipePage;
