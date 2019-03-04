import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({
  id,
  type = 'checkbox',
  name,
  value,
  checked = false,
  onChange
}) => (
  <input
    id={id}
    type={type}
    name={name}
    value={value}
    checked={checked}
    onChange={onChange}
  />
);

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default CheckBox;
