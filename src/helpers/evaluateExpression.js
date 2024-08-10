// Функция для разбора математического выражения на операнды и операторы
const parseExpression = (expression) => {
  const operators = [];
  const values = [];
  let currentNumber = '';

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
  return [values, operators];
};

// Вспомогательная функция для выполнения арифметических операций
const calculateResult = (values, operators) => {
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '*' || operators[i] === '/') {
      const result =
        operators[i] === '*'
          ? values[i] * values[i + 1]
          : values[i] / values[i + 1];
      values.splice(i, 2, result);
      operators.splice(i, 1);
      i--;
    }
  }

  let result = values[0];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '+') {
      result += values[i + 1];
    } else if (operators[i] === '-') {
      result -= values[i + 1];
    }
  }

  return isNaN(result) ? 'Error' : parseFloat(result.toFixed(10));
};

// Функция для вычисления результата математического выражения
export const evaluateExpression = (expression) => {
  const [values, operators] = parseExpression(expression);
  return calculateResult(values, operators);
};
