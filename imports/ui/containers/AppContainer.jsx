import { withTracker } from 'meteor/react-meteor-data';
import { Recipes } from '../../api/recipes/recipes';
import App from '../layouts/App.jsx';

const AppContainer = withTracker(() => ({
  recipes: Recipes.find({}).fetch()
}))(App);

export default AppContainer;
