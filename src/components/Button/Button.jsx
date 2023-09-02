import PropTypes from 'prop-types';

import { LoadMoreButton } from './Button.styled';

const Button = ({ onClick }) => (
  <LoadMoreButton type="button" onClick={() => onClick(page => page + 1)}>
    Load more
  </LoadMoreButton>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;