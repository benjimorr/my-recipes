import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Recipes = new Mongo.Collection('recipes');

const RecipesSchema = new SimpleSchema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  comments: {
    type: String,
    optional: true,
  },
  mainIngredients: {
    type: Array,
    minCount: 1,
  },
  'mainIngredients.$': String,
  tags: {
    type: Array,
    minCount: 1,
  },
  'tags.$': String,
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  userId: {
    type: String,
  },
});

Recipes.attachSchema(RecipesSchema);
