import styled from 'styled-components';

const AuthStyles = styled.div`
  background: ${props => props.theme.blue};
  border-radius: 10px;
  box-shadow: ${props => props.theme.boxShadow};
  color: white;
  margin: 8rem auto 0;
  max-width: 400px;
  padding: 0.5rem 2rem 3rem;
  h1 {
    font-weight: 300;
    margin-bottom: 0;
    text-align: center;
    text-shadow: 3px;
  }
  form {
    background: none;
    border: none;
    box-shadow: none;
  }
  button {
    background: white;
    color: ${props => props.theme.black};
  }
  p {
    margin: 0;
    text-align: center;
    a {
      color: white;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default AuthStyles;
