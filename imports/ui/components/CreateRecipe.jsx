import React, { Component } from 'react';
import styled from 'styled-components';
import Form from '../styles/Form';
import CheckBox from './CheckBox';
import Tag from './Tag';
import checkboxes from '../../../lib/tagsCheckboxes';

import { Recipes } from '../../api/recipes/recipes';

const RecipeTags = styled.div`
  .recipe-tags-area {
    display: grid;
    font-size: 1.25rem;
    font-weight: normal;
    grid-gap: 5px;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 1rem 0;
    input {
      display: inline-block;
      margin: 0 1rem;
      width: auto;
    }
  }
`;

export class CreateRecipe extends Component {
  state = {
    title: '',
    currentIngredient: '',
    mainIngredients: [],
    tags: new Map(),
    url: '',
    comments: '',
    loading: false,
    error: ''
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

  handleKeyDown = e => {
    const { value } = e.target;
    if (e.key === 'Enter' && value) {
      e.preventDefault();
      const val = value.toLowerCase();

      // Check if ingredient already exists
      if (this.state.mainIngredients.find(ingredient => ingredient === val))
        return;

      this.setState({
        currentIngredient: '',
        mainIngredients: [...this.state.mainIngredients, val]
      });
    }
  };

  handleTagRemove = name => {
    const newIngredients = this.state.mainIngredients.filter(
      ingredient => ingredient !== name
    );
    this.setState({ mainIngredients: newIngredients });
  };

  handleSubmit = e => {
    e.preventDefault();

    // Get values from state
    const { title, url, mainIngredients, tags } = this.state;
    // Find the tags from the Map structure that are actually selected
    const selectedTags = [...tags].reduce((acc, [key, value]) => {
      if (value) acc.push(key);
      return acc;
    }, []);

    if (selectedTags.length <= 0) {
      this.setState({ error: 'Please add at least one recipe tag.' });
    } else if (mainIngredients.length <= 0) {
      this.setState({ error: 'Please add at least one main ingredient.' });
    } else {
      this.setState({ loading: true });
      Recipes.insert({
        title,
        url,
        mainIngredients,
        tags: selectedTags,
        createdAt: new Date(),
        lastUsed: new Date()
      });
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, error } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        {error && <p>{error}</p>}
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

          <label htmlFor="comments">
            Comments
            <textarea
              id="comments"
              name="comments"
              placeholder="Enter Comments"
              value={this.state.comments}
              onChange={this.handleChange}
            />
          </label>

          <RecipeTags>
            Recipe Tags
            <div className="recipe-tags-area">
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
          </RecipeTags>

          <div className="main-ingredients">
            <label htmlFor="currentIngredient">
              Main Ingredients
              <input
                type="text"
                id="currentIngredient"
                name="currentIngredient"
                placeholder="Type an Ingredient and Press Enter"
                size="35"
                value={this.state.currentIngredient}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
              />
            </label>
            {this.state.mainIngredients.length > 0 && (
              <ul className="ingredient-tags">
                {this.state.mainIngredients.map((ingredient, i) => (
                  <Tag
                    key={i}
                    name={ingredient}
                    onClick={this.handleTagRemove}
                  />
                ))}
              </ul>
            )}
          </div>

          <button type="submit" disabled={loading}>
            Submit
          </button>
        </fieldset>
      </Form>
    );
  }
}

export default CreateRecipe;
