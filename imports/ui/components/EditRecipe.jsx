import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../styles/Form';

class EditRecipe extends Component {
  state = {
    title: '',
    url: '',
    comments: '',
    error: ''
  };

  componentDidUpdate(prevProps) {
    if (prevProps.recipe !== this.props.recipe) {
      const { title, url, comments } = this.props.recipe;
      this.setState({
        title,
        url,
        comments
      });
    }
  }

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
    // ...
  };

  render() {
    const { recipeId, recipe, loading } = this.props;
    const { title, url, comments, error } = this.state;

    if (loading) return <p>Loading...</p>;
    if (!recipe) return <p>{`No recipe found with ID ${recipeId}`}</p>;

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

          <button type="submit" disabled={loading}>
            Update
          </button>
        </fieldset>
      </Form>
    );
  }
}

EditRecipe.propTypes = {
  recipeId: PropTypes.string.isRequired
};

EditRecipe.defaultProps = {
  recipeId: ''
};

export default EditRecipe;
