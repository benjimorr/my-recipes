import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import AuthStyles from '../styles/AuthStyles';
import Form from '../styles/Form';

class ForgotPassword extends Component {
  state = {
    email: '',
    loading: false,
    error: '',
    success: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { email } = this.state;

    Accounts.forgotPassword({ email }, error => {
      if (error) {
        this.setState({ loading: false, error: error.reason, success: '' });
      } else {
        this.setState({
          loading: false,
          error: '',
          success: 'Success! Please check your email to reset your password',
        });
      }
    });
  };

  render() {
    const { email, error, success, loading } = this.state;

    return (
      <AuthStyles>
        <h1>Request Password Reset</h1>
        <Form onSubmit={this.handleSubmit}>
          {error && <p className="errorMessage">{error}</p>}
          {success && <p>{success}</p>}
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

            <button type="submit" disabled={loading}>
              Submit
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

export default ForgotPassword;
