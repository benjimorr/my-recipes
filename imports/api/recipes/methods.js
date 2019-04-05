import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Recipes } from './recipes';

Meteor.methods({
  addRecipe({ title, url, comments, mainIngredients, tags }) {
    check(title, String);
    check(url, String);
    check(comments, String);
    check(mainIngredients, Array);
    check(tags, Array);

    const userId = Meteor.userId();
    if (!userId) {
      throw new Meteor.Error('no-user', 'You must be signed in!');
    }

    Recipes.insert({
      title,
      url,
      comments,
      mainIngredients,
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId,
    });
  },
  updateRecipe({ id, title, url, comments }) {
    check(id, String);
    check(title, String);
    check(url, String);
    check(comments, String);

    const userId = Meteor.userId();
    const recipe = Recipes.findOne(id);
    if (!userId) {
      throw new Meteor.Error('no-user', 'You must be signed in!');
    }
    if (recipe.userId !== userId) {
      throw new Meteor.Error(
        'user-not-allowed',
        'You do not have permission to do that!'
      );
    }

    Recipes.update(id, {
      $set: {
        title,
        url,
        comments,
        updatedAt: new Date(),
      },
    });
  },
  deleteRecipe(id) {
    check(id, String);

    const userId = Meteor.userId();
    const recipe = Recipes.findOne(id);
    if (!userId) {
      throw new Meteor.Error('no-user', 'You must be signed in!');
    }
    if (recipe.userId !== userId) {
      throw new Meteor.Error(
        'user-not-allowed',
        'You do not have permission to do that!'
      );
    }

    Recipes.remove(id);
  },
});
