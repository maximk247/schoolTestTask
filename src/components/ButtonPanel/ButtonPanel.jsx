import PropTypes from 'prop-types';
import { buttons } from '../../consts/buttons';
import Button from '../Button/Button';
import './ButtonPanel.css';

const ButtonPanel = ({ handleClick }) => {
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
