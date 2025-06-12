export type Operation = '+' | '-' | '*' | '/' | '=' | null;

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: Operation;
  waitingForNewValue: boolean;
  memory: number;
  hasMemory: boolean;
  error: string | null;
  operationDisplay: string;
}

export type ButtonType = 'number' | 'operation' | 'function' | 'memory' | 'clear';