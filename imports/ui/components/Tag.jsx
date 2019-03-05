import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTag = styled.li``;

const Tag = ({ name, onClick }) => (
  <StyledTag>
    {name}
    <button
      onClick={e => {
        e.preventDefault();
        onClick(name);
      }}
    >
      &times;
    </button>
  </StyledTag>
);

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Tag;
