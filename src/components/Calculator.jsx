import { useState } from 'react';
import ButtonPanel from './ButtonPanel';
import './Calculator.css';
import Display from './Display';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [overwrite, setOverwrite] = useState(false); // Новое состояние для сброса ввода

  const evaluateExpression = (expression) => {
    const operators = [];
    const values = [];
    let currentNumber = '';

    // Проходим по каждому символу выражения
    for (let char of expression) {
      if (!isNaN(char) || char === '.') {
        currentNumber += char;
      } else {
        if (currentNumber === '' && char === '-') {
          currentNumber = '-';
        } else {
          values.push(parseFloat(currentNumber));
          operators.push(char);
          currentNumber = '';
        }
      }
    }
    values.push(parseFloat(currentNumber));

    // Выполняем умножение и деление сначала
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === '*' || operators[i] === '/') {
        const [a, b] = [values[i], values[i + 1]];
        const result = operators[i] === '*' ? a * b : a / b;
        values.splice(i, 2, result);
        operators.splice(i, 1);
        i--;
      }
    }

    // Затем выполняем сложение и вычитание
    let result = values[0];
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === '+') {
        result += values[i + 1];
      } else if (operators[i] === '-') {
        result -= values[i + 1];
      }
    }

    return isNaN(result) ? 'Error' : result;
  };

  const handleClick = (value) => {
    if (
      overwrite &&
      !['+', '-', '*', '/'].includes(value) &&
      value !== 'AC' &&
      value !== 'DEL'
    ) {
      if (value === '.') {
        setInput('0.');
      } else {
        setInput(value);
      }
      setOverwrite(false);
      return;
    }

    switch (value) {
      case 'AC':
        setInput('');
        setOverwrite(false);
        break;
      case 'DEL':
        if (overwrite) {
          setInput('');
          setOverwrite(false);
        } else {
          setInput(input.slice(0, -1));
        }
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
        if (value === '.' && (input === '' || input.slice(-1) === ' ')) {
          setInput('0.');
        } else if (['+', '-', '*', '/'].includes(value)) {
          if (overwrite) {
            setInput(input + value);
            setOverwrite(false);
          } else if (input.slice(-1) === '.') {
            setInput(input.slice(0, -1) + value);
          } else if (
            input === '' ||
            ['+', '-', '*', '/'].includes(input.slice(-1))
          ) {
            setInput(input.slice(0, -1) + value);
          } else {
            setInput(input + value);
          }
        } else {
          setInput(input + value);
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
