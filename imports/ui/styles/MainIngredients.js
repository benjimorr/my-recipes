import styled from 'styled-components';

const MainIngredients = styled.div`
  .ingredientTags {
    padding: 0;
    li {
      background-color: ${props => props.theme.blue};
      border-radius: 5px;
      color: white;
      display: inline-block;
      font-size: 1.5rem;
      list-style: none;
      margin: 0 1rem 0.5rem 0;
      padding: 0 1.5rem 0.5rem 1.5rem;
    }
    button {
      margin: 0 0 0 1rem;
      padding: 0;
    }
  }
`;

export default MainIngredients;
