import PropTypes from 'prop-types';
import Button from './Button';

const ButtonPanel = ({ handleClick }) => {
  const buttons = [
    ['AC', 'DEL', '/', '*'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.'],
  ];

  return (
    <div className="button-panel">
      {buttons.flat().map((btn, idx) => (
        <Button key={idx} value={btn} onClick={handleClick} />
      ))}
    </div>
  );
};

ButtonPanel.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ButtonPanel;
