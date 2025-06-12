import React from 'react';
import { formatDisplay } from '../utils/calculator';

interface DisplayProps {
  value: string;
  hasMemory: boolean;
  error: string | null;
  operationDisplay?: string;
}

export const Display: React.FC<DisplayProps> = ({ value, hasMemory, error, operationDisplay }) => {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 mb-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50"></div>
      <div className="relative z-10">
        {hasMemory && (
          <div className="text-blue-400 text-sm font-medium mb-2 flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
            Memory
          </div>
        )}
        
        {/* Operation Display */}
        <div className="text-right mb-2">
          <div className="text-gray-400 text-lg font-light min-h-[1.5rem]">
            {operationDisplay || ''}
          </div>
        </div>
        
        {/* Main Display */}
        <div className="text-right">
          <div 
            className={`text-4xl font-light text-white leading-none break-all ${
              error ? 'text-red-400' : ''
            }`}
            style={{ minHeight: '3rem' }}
          >
            {error || formatDisplay(value)}
          </div>
        </div>
      </div>
    </div>
  );
};