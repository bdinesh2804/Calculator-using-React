import React from 'react';
import { Display } from './Display';
import { Button } from './Button';
import { useCalculator } from '../hooks/useCalculator';

export const Calculator: React.FC = () => {
  const calculator = useCalculator();

  const buttons = [
    [
      { label: 'MC', action: calculator.memoryClear, type: 'memory' as const },
      { label: 'MR', action: calculator.memoryRecall, type: 'memory' as const },
      { label: 'M+', action: calculator.memoryAdd, type: 'memory' as const },
      { label: 'M-', action: calculator.memorySubtract, type: 'memory' as const },
    ],
    [
      { label: 'AC', action: calculator.clear, type: 'clear' as const },
      { label: 'CE', action: calculator.clearEntry, type: 'function' as const },
      { label: '±', action: calculator.toggleSign, type: 'function' as const },
      { label: '÷', action: () => calculator.inputOperation('/'), type: 'operation' as const },
    ],
    [
      { label: '7', action: () => calculator.inputNumber('7'), type: 'number' as const },
      { label: '8', action: () => calculator.inputNumber('8'), type: 'number' as const },
      { label: '9', action: () => calculator.inputNumber('9'), type: 'number' as const },
      { label: '×', action: () => calculator.inputOperation('*'), type: 'operation' as const },
    ],
    [
      { label: '4', action: () => calculator.inputNumber('4'), type: 'number' as const },
      { label: '5', action: () => calculator.inputNumber('5'), type: 'number' as const },
      { label: '6', action: () => calculator.inputNumber('6'), type: 'number' as const },
      { label: '−', action: () => calculator.inputOperation('-'), type: 'operation' as const },
    ],
    [
      { label: '1', action: () => calculator.inputNumber('1'), type: 'number' as const },
      { label: '2', action: () => calculator.inputNumber('2'), type: 'number' as const },
      { label: '3', action: () => calculator.inputNumber('3'), type: 'number' as const },
      { label: '+', action: () => calculator.inputOperation('+'), type: 'operation' as const },
    ],
    [
      { label: '0', action: () => calculator.inputNumber('0'), type: 'number' as const, className: 'col-span-2' },
      { label: '.', action: () => calculator.inputNumber('.'), type: 'number' as const },
      { label: '=', action: () => calculator.inputOperation('='), type: 'operation' as const },
    ],
  ];

  return (
    <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-2xl p-6 backdrop-blur-lg bg-opacity-95">
      <Display 
        value={calculator.display} 
        hasMemory={calculator.hasMemory}
        error={calculator.error}
        operationDisplay={calculator.operationDisplay}
      />
      
      <div className="space-y-3">
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-3">
            {row.map((button, buttonIndex) => (
              <Button
                key={buttonIndex}
                onClick={button.action}
                type={button.type}
                className={button.className}
              >
                {button.label}
              </Button>
            ))}
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center text-xs text-gray-500">
        Use keyboard for input • ESC to clear
      </div>
    </div>
  );
};