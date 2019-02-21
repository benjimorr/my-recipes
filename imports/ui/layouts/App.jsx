import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Recipes from '../components/Recipes';

const theme = {
  blue: '#007AB2',
  black: '#393939',
  grey: '#757575',
  lightGrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  boxShadow: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    font-size: 1.5rem;
    line-height: 2;
  }

  a {
    text-decoration: none;
    color: ${theme.black};
  }
`;

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

const App = props => {
  const { recipes } = props;

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <GlobalStyle />
          <StyledPage>
            <Inner>
              <h1>Welcome to MyRecipes!</h1>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <Recipes {...props} recipes={recipes} />}
                />
                <Route
                  exact
                  path="/recipes"
                  render={props => <Recipes {...props} recipes={recipes} />}
                />
              </Switch>
            </Inner>
          </StyledPage>
        </React.Fragment>
      </ThemeProvider>
    </Router>
  );
};

App.propTypes = {
  recipes: PropTypes.array
};

App.defaultProps = {
  recipes: []
};

export default App;
