import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthStyles from '../styles/AuthStyles';
import Form from '../styles/Form';

class Signup extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
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
    const { email, name, password, confirmPassword } = this.state;
    const { history } = this.props;

    if (password.length < 6) {
      this.setState({
        loading: false,
        error: 'Password must be at least 6 characters!',
      });
    } else if (password !== confirmPassword) {
      this.setState({ loading: false, error: 'Passwords must be the same!' });
    } else {
      Accounts.createUser({ email, password, profile: { name } }, error => {
        if (error) {
          this.setState({ loading: false, error: error.reason });
        } else {
          history.push('/');
        }
      });
    }
  };

  render() {
    const {
      email,
      name,
      password,
      confirmPassword,
      error,
      loading,
    } = this.state;

    return (
      <AuthStyles>
        <h1>Sign Up for MyRecipes</h1>
        <Form onSubmit={this.handleSubmit}>
          {error && <p className="errorMessage">{error}</p>}
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

            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                required
                value={name}
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

            <label htmlFor="confirmPassword">
              Confirm Password
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Your Password Again"
                required
                value={confirmPassword}
                onChange={this.handleChange}
              />
            </label>

            <button type="submit" disabled={loading}>
              Sign Up
            </button>
          </fieldset>
        </Form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
        <p>
          Forgot your password? <Link to="/forgot-password">Reset it here</Link>
        </p>
      </AuthStyles>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.object,
};

export default Signup;
