import styled from 'styled-components';

const RecipeListItem = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.boxShadow};
  position: relative;
  display: flex;
  flex-direction: column;
  h3 {
    background: ${props => props.theme.blue};
    color: white;
    font-size: 120%;
    margin-top: 0;
    margin-bottom: 2rem;
    min-height: 100px;
    padding: 1rem 2rem;
  }
  .recipeIngredients {
    border-bottom: 1px solid ${props => props.theme.lightGrey};
    margin-bottom: 1rem;
    min-height: 110px;
    padding: 0 1.5rem 1rem 1.5rem;
    h5 {
      font-size: 110%;
      margin: 0;
      padding: 0;
    }
  }
  p {
    flex-grow: 1;
    padding: 0 1.5rem;
  }
  .buttonList {
    display: grid;
    background: ${props => props.theme.lightGrey};
    border-top: 1px solid ${props => props.theme.lightGrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    text-align: center;
    text-transform: uppercase;
    width: 100%;
    & > * {
      background: white;
      border: 0;
      font-size: 1.25rem;
      padding: 1.25rem;
    }
  }
`;

export default RecipeListItem;
