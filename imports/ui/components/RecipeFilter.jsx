import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeTags from '../styles/RecipeTags';
import Form from '../styles/Form';
import RecipeFilterStyles from '../styles/RecipeFilterStyles';
import CheckBox from './CheckBox';
import checkboxes from '../../../lib/tagsCheckboxes';

class RecipeFilter extends Component {
  state = {
    title: '',
    mainIngredients: [],
    tags: [],
    filterMenuHidden: true,
  };

  handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === 'text') {
      this.setState({ [name]: value });
    } else if (type === 'checkbox') {
      const { tags } = this.state;
      if (checked) {
        const newTags = [...tags].concat([value]);
        this.setState({ tags: newTags });
      } else if (!checked) {
        const newTags = tags.filter(tag => tag !== value);
        this.setState({ tags: newTags });
      }
    }
  };

  toggleFilterMenu = () => {
    this.setState(prevState => ({
      filterMenuHidden: !prevState.filterMenuHidden,
    }));
  };

  render() {
    const { title, mainIngredients, tags, filterMenuHidden } = this.state;
    const { handleFilterSubmit } = this.props;

    return (
      <RecipeFilterStyles>
        <button
          className="filterMenuButton"
          type="button"
          onClick={this.toggleFilterMenu}
        >
          {filterMenuHidden ? 'Filter Recipes' : 'Hide Filter Menu'}
        </button>
        <div className="filterMenu" hidden={filterMenuHidden}>
          <Form onSubmit={handleFilterSubmit({ title, mainIngredients, tags })}>
            <fieldset>
              <label htmlFor="title">
                By Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Recipe Title"
                  value={title}
                  onChange={this.handleChange}
                />
              </label>

              <RecipeTags>
                By Recipe Tags
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

              <button type="submit">Apply</button>
            </fieldset>
          </Form>
        </div>
      </RecipeFilterStyles>
    );
  }
}

RecipeFilter.propTypes = {
  handleFilterSubmit: PropTypes.func.isRequired,
};

export default RecipeFilter;
