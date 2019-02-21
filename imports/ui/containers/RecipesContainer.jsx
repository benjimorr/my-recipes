import { withTracker } from 'meteor/react-meteor-data';
import { Recipes } from '../../api/recipes/recipes';
import RecipesComponent from '../components/Recipes';

const RecipesContainer = withTracker(() => ({
  recipes: Recipes.find({}).fetch()
}))(RecipesComponent);

export default RecipesContainer;
