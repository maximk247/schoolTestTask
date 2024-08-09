import PropTypes from 'prop-types';

const Button = ({ value, onClick }) => (
  <button onClick={() => onClick(value)}>{value}</button>
);

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
