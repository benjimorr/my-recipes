import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({ name, withButton, onClick }) => (
  <li>
    {name}
    {withButton && (
      <button
        onClick={e => {
          e.preventDefault();
          onClick(name);
        }}
      >
        &times;
      </button>
    )}
  </li>
);

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  withButton: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

export default Tag;
