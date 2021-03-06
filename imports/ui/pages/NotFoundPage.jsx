import React from 'react';
import styled from 'styled-components';

const Center = styled.div`
  text-align: center;
`;

const NotFoundPage = () => (
  <Center>
    <h1>Oops!</h1>
    <p>That page was not found.</p>
  </Center>
);

export default NotFoundPage;
