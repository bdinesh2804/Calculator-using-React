import { CalculatorState, Operation } from '../types/calculator';

export const formatDisplay = (value: string): string => {
  // Remove leading zeros but keep decimal numbers
  if (value === '0' || value === '') return '0';
  
  // Handle decimal numbers
  if (value.includes('.')) {
    const [integer, decimal] = value.split('.');
    const formattedInteger = integer === '' ? '0' : parseInt(integer).toLocaleString();
    return `${formattedInteger}.${decimal}`;
  }
  
  // Handle integers
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return '0';
  
  // Format large numbers with commas
  return numValue.toLocaleString();
};

export const formatOperationDisplay = (previousValue: number | null, operation: Operation, currentValue?: string): string => {
  if (!previousValue || !operation) return '';
  
  const operationSymbols = {
    '+': '+',
    '-': '−',
    '*': '×',
    '/': '÷',
    '=': '='
  };
  
  const formattedPrevious = formatDisplay(String(previousValue));
  const symbol = operationSymbols[operation] || operation;
  
  if (currentValue && operation !== '=') {
    const formattedCurrent = formatDisplay(currentValue);
    return `${formattedPrevious} ${symbol} ${formattedCurrent}`;
  }
  
  return `${formattedPrevious} ${symbol}`;
};

export const calculate = (firstValue: number, secondValue: number, operation: Operation): number => {
  switch (operation) {
    case '+':
      return firstValue + secondValue;
    case '-':
      return firstValue - secondValue;
    case '*':
      return firstValue * secondValue;
    case '/':
      if (secondValue === 0) throw new Error('Cannot divide by zero');
      return firstValue / secondValue;
    default:
      return secondValue;
  }
};

export const isValidNumber = (value: string): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
};

export const handlePercentage = (value: number, previousValue: number | null, operation: Operation): number => {
  if (operation === '+' || operation === '-') {
    return previousValue ? (previousValue * value) / 100 : value / 100;
  }
  return value / 100;
};