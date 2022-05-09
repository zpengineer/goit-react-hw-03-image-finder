import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onToggle }) => {
  return (
    <button type="button" onClick={onToggle}>
      Показать
    </button>
  );
};

Button.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default Button;
