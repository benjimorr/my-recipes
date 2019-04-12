import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthStyles from '../styles/AuthStyles';
import Form from '../styles/Form';

class ResetPassword extends Component {
  state = {
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
    const { password, confirmPassword } = this.state;
    const {
      history,
      match: {
        params: { token = '' },
      },
    } = this.props;

    if (password.length < 6) {
      this.setState({
        loading: false,
        error: 'Password must be at least 6 characters!',
      });
    } else if (password !== confirmPassword) {
      this.setState({ loading: false, error: 'Passwords must be the same!' });
    } else {
      Accounts.resetPassword(token, password, error => {
        if (error) {
          this.setState({ loading: false, error: error.reason });
        } else {
          history.push('/');
        }
      });
    }
  };

  render() {
    const { password, confirmPassword, loading, error } = this.state;

    return (
      <AuthStyles>
        <h1>Reset Your Password</h1>
        <Form onSubmit={this.handleSubmit}>
          {error && <p className="errorMessage">{error}</p>}
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="password">
              New Password
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
              Confirm New Password
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
              Reset Password
            </button>
          </fieldset>
        </Form>
        <p>
          <Link to="/login">Return to login page</Link>
        </p>
      </AuthStyles>
    );
  }
}

ResetPassword.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default ResetPassword;
