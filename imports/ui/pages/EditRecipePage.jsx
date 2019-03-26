import React from 'react';
import EditRecipe from '../components/EditRecipe';

const EditRecipePage = ({
  match: {
    params: { recipeId }
  }
}) => (
  <div>
    <h1>Edit Recipe</h1>
    <EditRecipe recipeId={recipeId} />
  </div>
);

export default EditRecipePage;
