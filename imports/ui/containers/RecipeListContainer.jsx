import { withTracker } from 'meteor/react-meteor-data';
import { Recipes } from '../../api/recipes/recipes';
import RecipeList from '../components/RecipeList';

const RecipeListContainer = withTracker(() => ({
  recipes: Recipes.find({}).fetch()
}))(RecipeList);

export default RecipeListContainer;
