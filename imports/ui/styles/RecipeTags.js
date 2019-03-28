import styled from 'styled-components';

const RecipeTags = styled.div`
  .recipeTagsArea {
    display: grid;
    font-size: 1.25rem;
    font-weight: normal;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    padding: 1rem 0;
    input {
      display: inline-block;
      margin: 0 1rem;
      width: auto;
    }
  }
`;

export default RecipeTags;
