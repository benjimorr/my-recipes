import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import App from '../../ui/layouts/App';
import Login from '../../ui/components/Login';
import Signup from '../../ui/components/Signup';
import ForgotPassword from '../../ui/components/ForgotPassword';
import ResetPassword from '../../ui/components/ResetPassword';

const theme = {
  blue: '#007AB2',
  black: '#393939',
  grey: '#757575',
  lightGrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  boxShadow: '0 12px 24px 0 rgba(0, 0, 0, 0.2)',
  smallBoxShadow: '0 8px 4px -2px rgba(0, 0, 0, 0.2)',
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

  .errorMessage {
    color: orange;
  }
`;

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

export const renderRoutes = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle />
        <StyledPage>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route
              exact
              path="/reset-password/:token"
              component={ResetPassword}
            />
            <Route path="/*" component={App} />
          </Switch>
        </StyledPage>
      </React.Fragment>
    </ThemeProvider>
  </Router>
);
