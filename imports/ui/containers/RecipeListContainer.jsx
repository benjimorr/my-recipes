import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Recipes } from '../../api/recipes/recipes';
import RecipeList from '../components/RecipeList';

const RecipeListContainer = withTracker(
  ({ filteredTitle, filteredIngredients, filteredTags }) => {
    const recipeListHandle = Meteor.subscribe('allRecipes');
    const loading = !recipeListHandle.ready();
    const recipes = Recipes.find({
      title: { $regex: filteredTitle, $options: 'i' },
    }).fetch();
    return {
      loading,
      recipes,
    };
  }
)(RecipeList);

export default RecipeListContainer;
