import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Recipes } from '../recipes';

Meteor.publish('allRecipes', () => {
  const userId = Meteor.userId();
  return Recipes.find({ userId }, { sort: { updatedAt: -1 } });
});

Meteor.publish('singleRecipe', recipeId => {
  check(recipeId, String);
  return Recipes.find(recipeId);
});
