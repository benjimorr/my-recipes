import React, { Component } from 'react';
import Form from '../styles/Form';
import CheckBox from './CheckBox';
import checkboxes from '../../../lib/tagsCheckboxes';

export class CreateRecipe extends Component {
  state = {
    title: '',
    mainIngredients: [],
    tags: new Map(),
    url: '',
    loading: false
  };

  handleChange = e => {
    const { name, type, value, checked } = e.target;
    if (type === 'checkbox') {
      this.setState(prevState => ({
        tags: prevState.tags.set(value, checked)
      }));
    } else {
      this.setState({ [name]: value });
    }
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

          <label htmlFor="url">
            Recipe URL
            <input
              type="url"
              id="url"
              name="url"
              placeholder="Recipe URL"
              required
              value={this.state.url}
              onChange={this.handleChange}
            />
          </label>

          <div className="recipe-tags">
            Recipe Tags
            {checkboxes.map(item => (
              <label htmlFor={item.name} key={item.name}>
                <CheckBox
                  id={item.name}
                  name={item.name}
                  value={item.value}
                  checked={this.state.tags.get(item.value)}
                  onChange={this.handleChange}
                />
                {item.title}
              </label>
            ))}
          </div>
        </fieldset>
      </Form>
    );
  }
}

export default CreateRecipe;
