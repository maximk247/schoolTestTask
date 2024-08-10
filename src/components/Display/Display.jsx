import PropTypes from 'prop-types';
import './Display.css';

const Display = ({ value }) => <div className="display">{value}</div>;

Display.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Display;
