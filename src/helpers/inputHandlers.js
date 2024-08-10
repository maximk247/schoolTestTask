import { isOperator } from './isOperator';

// Обработка десятичной точки
export const handleDecimal = (input) => {
  const lastOperand = input.split(/[+\-*/]/).pop();
  if (lastOperand === '') {
    return input + '0.';
  }
  if (!lastOperand.includes('.')) {
    return input + '.';
  }
  return input;
};

// Обработка операторов
export const handleOperator = (input, operator, overwrite) => {
  if (overwrite) {
    return input + operator;
  }
  if (input.slice(-1) === '.') {
    return input.slice(0, -1) + operator;
  }
  if (input === '' || isOperator(input.slice(-1))) {
    return input.slice(0, -1) + operator;
  }
  return input + operator;
};

// Обработка цифр
export const handleDigit = (input, digit) => {
  if (input === '0' && digit !== '.') {
    return digit;
  }
  return input + digit;
};
