import { useState } from 'react';
import ButtonPanel from './ButtonPanel';
import './Calculator.css';
import Display from './Display';

const Calculator = () => {
  const [input, setInput] = useState('');

  const evaluateExpression = (expression) => {
    return expression;
  };

  const handleClick = (value) => {
    switch (value) {
      case 'AC':
        setInput('');
        break;
      case 'DEL':
        setInput(input.slice(0, -1));
        break;
      case '=':
        try {
          const result = evaluateExpression(input);
          setInput(result);
        } catch {
          setInput('Error');
        }
        break;
      default:
        setInput(input + value);
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
