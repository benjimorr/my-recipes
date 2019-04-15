import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.emailTemplates.siteName = 'MyRecipes';
Accounts.emailTemplates.from = 'MyRecipes Admin <no-reply@myrecipes.com>';
Accounts.urls.resetPassword = token =>
  Meteor.absoluteUrl(`reset-password/${token}`);
