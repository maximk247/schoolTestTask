import { operators } from '../consts/operators';

// Проверка на является ли значение оператором
export const isOperator = (char) => operators.includes(char);
