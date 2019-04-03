import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Recipes } from '../../api/recipes/recipes';
import RecipeList from '../components/RecipeList';

const RecipeListContainer = withTracker(({ filteredTitle, filteredTags }) => {
  const queryObj = {
    title: { $regex: filteredTitle, $options: 'i' },
  };

  if (filteredTags.length) {
    queryObj.tags = { $in: filteredTags };
  }

  const recipeListHandle = Meteor.subscribe('allRecipes');
  const loading = !recipeListHandle.ready();
  const recipes = Recipes.find(queryObj).fetch();
  return {
    loading,
    recipes,
  };
})(RecipeList);

export default RecipeListContainer;
