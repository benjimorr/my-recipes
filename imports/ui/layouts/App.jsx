import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from '../components/Header';
import RecipesPage from '../pages/RecipesPage';
import CreateRecipePage from '../pages/CreateRecipePage';
import EditRecipePage from '../pages/EditRecipePage';
import NotFoundPage from '../pages/NotFoundPage';

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto 3rem auto;
  padding: 2rem;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: this.getMeteorData(),
      error: '',
    };
  }

  componentWillMount() {
    const { isAuthenticated } = this.state;
    const { history } = this.props;
    if (!isAuthenticated) {
      history.push('/login');
    }
  }

  componentDidUpdate() {
    const { isAuthenticated } = this.state;
    const { history } = this.props;
    if (!isAuthenticated) {
      history.push('/login');
    }
  }

  getMeteorData = () => Meteor.userId() !== null;

  logout = e => {
    e.preventDefault();
    const { history } = this.props;
    Meteor.logout(error => {
      if (error) {
        this.setState({ error: error.reason });
      } else {
        history.push('/login');
      }
    });
    history.push('/login');
  };

  render() {
    const { error } = this.state;

    return (
      <React.Fragment>
        <Header logout={this.logout} />
        <Inner>
          {error && <p className="errorMessage">{error}</p>}
          <Switch>
            <Route exact path="/" component={RecipesPage} />
            <Route exact path="/recipes" component={RecipesPage} />
            <Route exact path="/recipes/new" component={CreateRecipePage} />
            <Route
              exact
              path="/recipes/edit/:recipeId"
              component={EditRecipePage}
            />
            <Route path="/*" component={NotFoundPage} />
          </Switch>
        </Inner>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  history: PropTypes.object,
};

export default App;
