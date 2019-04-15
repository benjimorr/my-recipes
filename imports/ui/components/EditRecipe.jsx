import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from '../styles/Form';

class EditRecipe extends Component {
  state = {
    title: '',
    url: '',
    comments: '',
    error: '',
  };

  componentDidUpdate(prevProps) {
    const { recipe } = this.props;
    if (prevProps.recipe !== recipe) {
      const { title, url, comments = '' } = recipe;
      this.setState({
        title,
        url,
        comments,
      });
    }
  }

  deleteRecipe = () => {
    const { recipeId, history } = this.props;
    Meteor.call('deleteRecipe', recipeId, error => {
      if (error) {
        this.setState({ error: error.reason });
      } else {
        history.push('/recipes');
      }
    });
  };

  handleChange = e => {
    const { name, type, value, checked } = e.target;
    if (type === 'checkbox') {
      this.setState(prevState => ({
        tags: prevState.tags.set(value, checked),
      }));
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    // Get values from state & props
    const { title, url, comments } = this.state;
    const { recipeId, history } = this.props;

    Meteor.call(
      'updateRecipe',
      {
        id: recipeId,
        title,
        url,
        comments,
      },
      error => {
        if (error) {
          this.setState({ error: error.reason });
        } else {
          history.push('/recipes');
        }
      }
    );
  };

  render() {
    const { recipeId, recipe, loading } = this.props;
    const { title, url, comments, error } = this.state;

    if (loading) return <p>Loading...</p>;
    if (!recipe) return <p>{`No recipe found with ID ${recipeId}`}</p>;

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

          <button type="submit" disabled={loading}>
            Update
          </button>
        </fieldset>
        <button
          type="button"
          className="deleteButton"
          onClick={this.deleteRecipe}
          disabled={loading}
        >
          Delete
        </button>
      </Form>
    );
  }
}

EditRecipe.propTypes = {
  recipeId: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      comments: PropTypes.string.isRequired,
      mainIngredients: PropTypes.array.isRequired,
      tags: PropTypes.array.isRequired,
      userId: PropTypes.string.isRequired,
    })
  ).isRequired,
  history: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

EditRecipe.defaultProps = {
  recipeId: '',
  loading: false,
};

export default withRouter(EditRecipe);
