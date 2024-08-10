import PropTypes from 'prop-types';
import { memo } from 'react';
import './Display.css';

const Display = memo(({ value, previousOperand, operator }) => (
  <div className="display">
    <span className="previous-operand">
      {previousOperand} {operator}
    </span>
    <span className="current-operand">{value || '0'}</span>
  </div>
));

Display.displayName = 'Display';

Display.propTypes = {
  value: PropTypes.string.isRequired,
  previousOperand: PropTypes.string,
  operator: PropTypes.string,
};

export default Display;
