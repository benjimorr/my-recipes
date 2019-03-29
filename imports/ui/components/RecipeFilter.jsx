import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecipeFilter extends Component {
  state = {
    title: '',
    mainIngredients: [],
    tags: [],
    filterMenuHidden: true,
  };

  handleChange = e => {
    const { name, value, type } = e.target;
    if (type === 'text') {
      this.setState({ [name]: value });
    } else {
      // ...
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
      <div>
        <button type="button" onClick={this.toggleFilterMenu}>
          Filter Recipes
        </button>
        <div hidden={filterMenuHidden}>
          <form onSubmit={handleFilterSubmit({ title, mainIngredients, tags })}>
            <fieldset>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Recipe Title"
                  value={title}
                  onChange={this.handleChange}
                />
              </label>

              <button type="submit">Filter</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

RecipeFilter.propTypes = {
  handleFilterSubmit: PropTypes.func.isRequired,
};

export default RecipeFilter;
