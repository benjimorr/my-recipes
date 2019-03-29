import { check } from 'meteor/check';
import { Recipes } from '../recipes';

Meteor.publish('allRecipes', () => Recipes.find());

Meteor.publish('singleRecipe', recipeId => {
  check(recipeId, String);
  return Recipes.find(recipeId);
});
