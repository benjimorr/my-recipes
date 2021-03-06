import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
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
    tags: [],
    url: '',
    comments: '',
    loading: false,
    error: '',
  };

  handleChange = e => {
    const { name, type, value, checked } = e.target;
    if (type === 'checkbox') {
      const { tags } = this.state;
      if (checked) {
        const newTags = [...tags].concat([value]);
        this.setState({ tags: newTags });
      } else if (!checked) {
        const newTags = tags.filter(tag => tag !== value);
        this.setState({ tags: newTags });
      }
    } else {
      this.setState({ [name]: value });
    }
  };

  handleKeyDown = e => {
    const { value } = e.target;
    if (e.key === 'Enter' && value) {
      e.preventDefault();
      const { mainIngredients } = this.state;
      const val = value.toLowerCase();

      // Check if ingredient already exists
      if (mainIngredients.find(ingredient => ingredient === val)) return;

      this.setState(prevState => ({
        currentIngredient: '',
        mainIngredients: [...prevState.mainIngredients, val],
      }));
    }
  };

  handleTagRemove = name => {
    const { mainIngredients } = this.state;
    const newIngredients = mainIngredients.filter(
      ingredient => ingredient !== name
    );
    this.setState({ mainIngredients: newIngredients });
  };

  handleSubmit = e => {
    e.preventDefault();

    // Get values from state & props
    const { title, url, comments, mainIngredients, tags } = this.state;
    const { history } = this.props;

    if (tags.length <= 0) {
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
          tags,
        },
        error => {
          if (error) {
            this.setState({ loading: false, error: error.reason });
          } else {
            history.push('/recipes');
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
      mainIngredients,
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        {error && <p className="errorMessage">{error}</p>}
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
                    checked={tags.includes(item.value)}
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
                    withButton
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
};

export default withRouter(CreateRecipe);
