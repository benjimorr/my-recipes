import styled from 'styled-components';

const RecipeListItem = styled.li`
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.boxShadow};
  list-style: none;
  padding: 2rem;
`;

export default RecipeListItem;
