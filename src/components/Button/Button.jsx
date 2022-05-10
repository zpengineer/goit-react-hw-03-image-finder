import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ loadMore }) => {
  return (
    <button type="button" onClick={loadMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
