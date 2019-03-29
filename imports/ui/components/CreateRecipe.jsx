import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from '../styles/Form';
import RecipeTags from '../styles/RecipeTags';
import MainIngredients from '../styles/MainIngredients';
import CheckBox from './CheckBox';
import Tag from './Tag';
import checkboxes from '../../../lib/tagsCheckboxes';

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
    const { title, url, comments, mainIngredients, tags } = this.state;
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

      Meteor.call(
        'addRecipe',
        {
          title,
          url,
          comments,
          mainIngredients,
          tags: selectedTags
        },
        error => {
          if (error) {
            this.setState({ loading: false, error: error.message });
          } else {
            this.props.history.push('/recipes');
          }
        }
      );
    }
  };

  render() {
    const {
      loading,
      error,
      title,
      url,
      comments,
      tags,
      currentIngredient,
      mainIngredients
    } = this.state;

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
              value={title}
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
              value={url}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="comments">
            Comments
            <textarea
              id="comments"
              name="comments"
              placeholder="Enter Comments"
              value={comments}
              onChange={this.handleChange}
            />
          </label>

          <RecipeTags>
            Recipe Tags
            <div className="recipeTagsArea">
              {checkboxes.map(item => (
                <label htmlFor={item.name} key={item.name}>
                  <CheckBox
                    id={item.name}
                    name={item.name}
                    value={item.value}
                    checked={tags.get(item.value)}
                    onChange={this.handleChange}
                  />
                  {item.title}
                </label>
              ))}
            </div>
          </RecipeTags>

          <MainIngredients>
            <label htmlFor="currentIngredient">
              Main Ingredients
              <input
                type="text"
                id="currentIngredient"
                name="currentIngredient"
                placeholder="Type an Ingredient and Press Enter"
                size="35"
                value={currentIngredient}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
              />
            </label>
            {mainIngredients.length > 0 && (
              <ul className="ingredientTags">
                {mainIngredients.map((ingredient, i) => (
                  <Tag
                    key={i}
                    name={ingredient}
                    withButton={true}
                    onClick={this.handleTagRemove}
                  />
                ))}
              </ul>
            )}
          </MainIngredients>

          <button type="submit" disabled={loading}>
            Save
          </button>
        </fieldset>
      </Form>
    );
  }
}

CreateRecipe.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};

export default withRouter(CreateRecipe);
