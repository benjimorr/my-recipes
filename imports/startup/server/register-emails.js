import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.urls.resetPassword = token =>
  Meteor.absoluteUrl(`reset-password/${token}`);
