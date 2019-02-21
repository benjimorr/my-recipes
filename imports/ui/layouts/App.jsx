import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import RecipesPage from '../pages/RecipesPage';
import NotFoundPage from '../pages/NotFoundPage';

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

const App = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle />
        <StyledPage>
          <Inner>
            <h1>Welcome to MyRecipes!</h1>
            <Switch>
              <Route exact path="/" component={RecipesPage} />
              <Route exact path="/recipes" component={RecipesPage} />
              <Route path="/*" component={NotFoundPage} />
            </Switch>
          </Inner>
        </StyledPage>
      </React.Fragment>
    </ThemeProvider>
  </Router>
);

export default App;
