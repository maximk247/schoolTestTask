import { useState } from 'react';
import { evaluateExpression } from '../../helpers/evaluateExpression';
import { handleDecimal, handleDigit } from '../../helpers/inputHandlers';
import { isOperator } from '../../helpers/isOperator';
import ButtonPanel from '../ButtonPanel';
import Display from '../Display';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [previousOperand, setPreviousOperand] = useState('');
  const [currentOperator, setCurrentOperator] = useState('');
  const [overwrite, setOverwrite] = useState(false);

  const handleClick = (value) => {
    // Очистка значений перед началом нового вычисления
    if (overwrite && !isOperator(value) && value !== 'AC' && value !== 'DEL') {
      setInput(value);
      setOverwrite(false);
      return;
    }
    switch (value) {
      case 'AC':
        setInput('');
        setPreviousOperand('');
        setCurrentOperator('');
        setOverwrite(false);
        break;
      case 'DEL':
        setInput(overwrite ? '' : input.slice(0, -1));
        setOverwrite(false);
        break;
      case '=':
        if (previousOperand && currentOperator && input) {
          try {
            const expression = `${previousOperand}${currentOperator}${input}`;
            const result = evaluateExpression(expression);
            setInput(result.toString());
            setPreviousOperand('');
            setCurrentOperator('');
            setOverwrite(true);
          } catch {
            setInput('Error');
          }
        }
        break;
      default:
        if (value === '.') {
          setInput(handleDecimal(input));
        } else if (isOperator(value)) {
          if (input) {
            // Если есть текущий операнд, вычисляем результат предыдущего выражения
            const expression = `${previousOperand}${currentOperator}${input}`;
            const result = evaluateExpression(expression);
            setPreviousOperand(result.toString());
            setCurrentOperator(value);
            setInput('');
          } else if (previousOperand) {
            setCurrentOperator(value);
          }
          setOverwrite(false);
        } else {
          setInput(handleDigit(input, value));
        }
        break;
    }
  };

  return (
    <div className="calculator">
      <Display
        value={input}
        previousOperand={previousOperand}
        operator={currentOperator}
      />
      <ButtonPanel handleClick={handleClick} />
    </div>
  );
};

export default Calculator;
