import styled from 'styled-components';

const RecipeListStyles = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

export default RecipeListStyles;
