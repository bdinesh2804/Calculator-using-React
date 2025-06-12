import { useState, useCallback, useEffect } from 'react';
import { CalculatorState, Operation } from '../types/calculator';
import { calculate, isValidNumber, handlePercentage, formatOperationDisplay } from '../utils/calculator';

const initialState: CalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForNewValue: false,
  memory: 0,
  hasMemory: false,
  error: null,
  operationDisplay: '',
};

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>(initialState);

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const updateOperationDisplay = (prevValue: number | null, operation: Operation, currentValue?: string) => {
    return formatOperationDisplay(prevValue, operation, currentValue);
  };

  const inputNumber = useCallback((num: string) => {
    clearError();
    setState(prev => {
      if (prev.waitingForNewValue) {
        const newDisplay = num;
        return {
          ...prev,
          display: newDisplay,
          waitingForNewValue: false,
          operationDisplay: updateOperationDisplay(prev.previousValue, prev.operation, newDisplay),
        };
      }
      
      let newDisplay;
      if (prev.display === '0' && num !== '.') {
        newDisplay = num;
      } else if (num === '.' && prev.display.includes('.')) {
        return prev;
      } else {
        newDisplay = prev.display + num;
      }
      
      return {
        ...prev,
        display: newDisplay,
        operationDisplay: updateOperationDisplay(prev.previousValue, prev.operation, newDisplay),
      };
    });
  }, []);

  const inputOperation = useCallback((nextOperation: Operation) => {
    clearError();
    setState(prev => {
      const inputValue = parseFloat(prev.display);
      
      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: inputValue,
          operation: nextOperation,
          waitingForNewValue: true,
          operationDisplay: updateOperationDisplay(inputValue, nextOperation),
        };
      }
      
      if (prev.operation && prev.waitingForNewValue) {
        return {
          ...prev,
          operation: nextOperation,
          operationDisplay: updateOperationDisplay(prev.previousValue, nextOperation),
        };
      }
      
      try {
        const result = calculate(prev.previousValue, inputValue, prev.operation);
        
        if (nextOperation === '=') {
          return {
            ...prev,
            display: String(result),
            previousValue: null,
            operation: null,
            waitingForNewValue: true,
            operationDisplay: '',
          };
        }
        
        return {
          ...prev,
          display: String(result),
          previousValue: result,
          operation: nextOperation,
          waitingForNewValue: true,
          operationDisplay: updateOperationDisplay(result, nextOperation),
        };
      } catch (error) {
        return {
          ...prev,
          error: error instanceof Error ? error.message : 'Error',
          display: 'Error',
          previousValue: null,
          operation: null,
          waitingForNewValue: true,
          operationDisplay: '',
        };
      }
    });
  }, []);

  const clear = useCallback(() => {
    setState(initialState);
  }, []);

  const clearEntry = useCallback(() => {
    clearError();
    setState(prev => ({
      ...prev,
      display: '0',
      waitingForNewValue: false,
      operationDisplay: updateOperationDisplay(prev.previousValue, prev.operation, '0'),
    }));
  }, []);

  const inputPercentage = useCallback(() => {
    clearError();
    setState(prev => {
      const value = parseFloat(prev.display);
      const result = handlePercentage(value, prev.previousValue, prev.operation);
      
      return {
        ...prev,
        display: String(result),
        waitingForNewValue: true,
        operationDisplay: updateOperationDisplay(prev.previousValue, prev.operation, String(result)),
      };
    });
  }, []);

  const toggleSign = useCallback(() => {
    clearError();
    setState(prev => {
      const value = parseFloat(prev.display);
      const newDisplay = String(-value);
      return {
        ...prev,
        display: newDisplay,
        operationDisplay: updateOperationDisplay(prev.previousValue, prev.operation, newDisplay),
      };
    });
  }, []);

  const memoryClear = useCallback(() => {
    setState(prev => ({
      ...prev,
      memory: 0,
      hasMemory: false,
    }));
  }, []);

  const memoryRecall = useCallback(() => {
    clearError();
    setState(prev => ({
      ...prev,
      display: String(prev.memory),
      waitingForNewValue: true,
      operationDisplay: updateOperationDisplay(prev.previousValue, prev.operation, String(prev.memory)),
    }));
  }, []);

  const memoryAdd = useCallback(() => {
    setState(prev => ({
      ...prev,
      memory: prev.memory + parseFloat(prev.display),
      hasMemory: true,
    }));
  }, []);

  const memorySubtract = useCallback(() => {
    setState(prev => ({
      ...prev,
      memory: prev.memory - parseFloat(prev.display),
      hasMemory: true,
    }));
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;
      
      if (key >= '0' && key <= '9') {
        inputNumber(key);
      } else if (key === '.') {
        inputNumber(key);
      } else if (key === '+') {
        inputOperation('+');
      } else if (key === '-') {
        inputOperation('-');
      } else if (key === '*') {
        inputOperation('*');
      } else if (key === '/') {
        event.preventDefault();
        inputOperation('/');
      } else if (key === 'Enter' || key === '=') {
        inputOperation('=');
      } else if (key === 'Escape') {
        clear();
      } else if (key === 'Backspace') {
        clearEntry();
      } else if (key === '%') {
        inputPercentage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [inputNumber, inputOperation, clear, clearEntry, inputPercentage]);

  return {
    ...state,
    inputNumber,
    inputOperation,
    clear,
    clearEntry,
    inputPercentage,
    toggleSign,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
  };
};