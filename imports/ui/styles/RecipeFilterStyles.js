import styled from 'styled-components';

const RecipeFilterStyles = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  .filterMenuButton {
    background: ${props => props.theme.blue};
    border: 0;
    border-radius: 5px;
    box-shadow: ${props => props.theme.smallBoxShadow};
    color: white;
    font-size: 125%;
    font-weight: 600;
    margin-bottom: 2rem;
    padding: 0.5rem 4rem;
  }
  .filterMenu {
    text-align: left;
  }
  .clearFilter {
    margin-left: 1rem;
  }
`;

export default RecipeFilterStyles;
