import React from 'react';
import RecipeFilter from '../components/RecipeFilter';
import RecipeListContainer from '../containers/RecipeListContainer';

class RecipesPage extends React.Component {
  state = {
    filteredTitle: '',
    filteredTags: [],
  };

  handleFilterSubmit = filteredValues => {
    const { title, tags } = filteredValues;
    this.setState({
      filteredTitle: title,
      filteredTags: tags,
    });
  };

  render() {
    const { filteredTitle, filteredTags } = this.state;

    return (
      <div>
        <h1>All Recipes</h1>
        <RecipeFilter handleFilterSubmit={this.handleFilterSubmit} />
        <RecipeListContainer
          filteredTitle={filteredTitle}
          filteredTags={filteredTags}
        />
      </div>
    );
  }
}

export default RecipesPage;
