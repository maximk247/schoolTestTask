import { useState } from 'react';
import { evaluateExpression } from '../../helpers/evaluateExpression';
import {
  handleDecimal,
  handleDigit,
  handleOperator,
} from '../../helpers/inputHandlers';
import { isOperator } from '../../helpers/isOperator';
import ButtonPanel from '../ButtonPanel';
import Display from '../Display';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [overwrite, setOverwrite] = useState(false);

  const handleClick = (value) => {
    switch (value) {
      case 'AC':
        setInput('');
        setOverwrite(false);
        break;
      case 'DEL':
        setInput(overwrite ? '' : input.slice(0, -1));
        setOverwrite(false);
        break;
      case '=':
        try {
          const result = evaluateExpression(input);
          setInput(result.toString());
          setOverwrite(true);
        } catch {
          setInput('Error');
        }
        break;
      default:
        if (value === '.') {
          setInput(handleDecimal(input));
        } else if (isOperator(value)) {
          setInput(handleOperator(input, value, overwrite));
          setOverwrite(false);
        } else {
          setInput(handleDigit(input, value));
        }
        break;
    }
  };

  return (
    <div className="calculator">
      <Display value={input} />
      <ButtonPanel handleClick={handleClick} />
    </div>
  );
};

export default Calculator;
