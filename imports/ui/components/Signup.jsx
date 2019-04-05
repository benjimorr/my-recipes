import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import AuthStyles from '../styles/AuthStyles';
import Form from '../styles/Form';

class Signup extends Component {
  render() {
    return (
      <div>
        <h1>Signup</h1>
      </div>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.object,
};

export default Signup;
