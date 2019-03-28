import { withTracker } from 'meteor/react-meteor-data';
import { Recipes } from '../../api/recipes/recipes';
import RecipeList from '../components/RecipeList';

const RecipeListContainer = withTracker(() => {
  const recipeListHandle = Meteor.subscribe('allRecipes');
  const loading = !recipeListHandle.ready();
  const recipes = Recipes.find().fetch();
  return {
    loading,
    recipes
  };
})(RecipeList);

export default RecipeListContainer;
