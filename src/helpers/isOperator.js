import { operators } from '../consts/operators';

// Проверка на то является ли значение оператором
export const isOperator = (char) => operators.includes(char);
