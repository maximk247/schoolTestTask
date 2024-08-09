import { useState } from 'react';
import ButtonPanel from './ButtonPanel';
import './Calculator.css';
import Display from './Display';

const Calculator = () => {
  const [input, setInput] = useState('');

  const evaluateExpression = (expression) => {
    // Разбиваем строку на операнды и операторы
    const operators = [];
    const values = [];
    let currentNumber = '';

    for (let char of expression) {
      if (!isNaN(char) || char === '.') {
        currentNumber += char;
      } else {
        values.push(parseFloat(currentNumber));
        operators.push(char);
        currentNumber = '';
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

    return result.toString();
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
