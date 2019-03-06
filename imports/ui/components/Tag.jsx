import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({ name, onClick }) => (
  <li>
    {name}
    <button
      onClick={e => {
        e.preventDefault();
        onClick(name);
      }}
    >
      &times;
    </button>
  </li>
);

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Tag;
