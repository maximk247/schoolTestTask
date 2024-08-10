import PropTypes from 'prop-types';
import { memo } from 'react';
import { buttons } from '../../consts/buttons';
import Button from '../Button/Button';
import './ButtonPanel.css';

const ButtonPanel = memo(({ handleClick }) => {
  return (
    <div className="button-panel">
      {buttons.flat().map((btn, idx) => (
        <Button key={idx} value={btn} onClick={handleClick} />
      ))}
    </div>
  );
});

ButtonPanel.displayName = 'ButtonPanel';

ButtonPanel.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ButtonPanel;
