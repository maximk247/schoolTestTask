import PropTypes from 'prop-types';
import './Display.css';

const Display = ({ value, previousOperand, operator }) => (
  <div className="display">
    <span className="previous-operand">
      {previousOperand} {operator}
    </span>
    <span className="current-operand">{value || '0'}</span>
  </div>
);

Display.propTypes = {
  value: PropTypes.string.isRequired,
  previousOperand: PropTypes.string,
  operator: PropTypes.string,
};

export default Display;
