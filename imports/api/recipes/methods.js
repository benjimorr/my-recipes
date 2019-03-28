import { Recipes } from './recipes';

Meteor.methods({
  addRecipe({ title, url, comments, mainIngredients, tags }) {
    Recipes.insert({
      title,
      url,
      comments,
      mainIngredients,
      tags,
      createdAt: new Date(),
      lastUsed: new Date()
    });
  }
});
