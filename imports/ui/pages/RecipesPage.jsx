import React from 'react';
import RecipeFilter from '../components/RecipeFilter';
import RecipeListContainer from '../containers/RecipeListContainer';

class RecipesPage extends React.Component {
  state = {
    filteredTitle: '',
    filteredIngredients: [],
    filteredTags: [],
  };

  handleFilterSubmit = filteredValues => e => {
    e.preventDefault();
    const { title, mainIngredients, tags } = filteredValues;
    this.setState({
      filteredTitle: title,
      filteredIngredients: mainIngredients,
      filteredTags: tags,
    });
  };

  render() {
    const { filteredTitle, filteredIngredients, filteredTags } = this.state;

    return (
      <div>
        <h1>All Recipes</h1>
        <RecipeFilter handleFilterSubmit={this.handleFilterSubmit} />
        <RecipeListContainer
          filteredTitle={filteredTitle}
          filteredIngredients={filteredIngredients}
          filteredTags={filteredTags}
        />
      </div>
    );
  }
}

export default RecipesPage;
