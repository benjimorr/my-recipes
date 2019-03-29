import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Recipes } from '../../api/recipes/recipes';
import EditRecipe from '../components/EditRecipe';

const EditRecipeContainer = withTracker(({ recipeId }) => {
  const singleRecipeHandle = Meteor.subscribe('singleRecipe', recipeId);
  const loading = !singleRecipeHandle.ready();
  const recipe = Recipes.findOne(recipeId);
  return {
    loading,
    recipe,
  };
})(EditRecipe);

export default EditRecipeContainer;
