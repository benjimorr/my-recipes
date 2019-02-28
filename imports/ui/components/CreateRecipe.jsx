import React, { Component } from 'react';
import Form from '../styles/Form';

export class CreateRecipe extends Component {
  state = {
    title: '',
    mainIngredients: [],
    tags: [],
    url: '',
    loading: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // Submit logic here
  };

  render() {
    const { loading } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Recipe Title"
              required
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>
        </fieldset>
      </Form>
    );
  }
}

export default CreateRecipe;
