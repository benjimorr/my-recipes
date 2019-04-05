import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthStyles from '../styles/AuthStyles';
import Form from '../styles/Form';

class Login extends Component {
  state = {
    email: '',
    password: '',
    loading: false,
    error: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const { history } = this.props;
    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        this.setState({ loading: false, error: err.reason });
      } else {
        history.push('/');
      }
    });
  };

  render() {
    const { email, password, error, loading } = this.state;

    return (
      <AuthStyles>
        <h1>Login to MyRecipes</h1>
        <Form onSubmit={this.handleSubmit}>
          {error && <p>{error}</p>}
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="email">
              Email
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
                value={email}
                onChange={this.handleChange}
              />
            </label>

            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your Password"
                required
                value={password}
                onChange={this.handleChange}
              />
            </label>

            <button type="submit" disabled={loading}>
              Login
            </button>
          </fieldset>
        </Form>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </AuthStyles>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
