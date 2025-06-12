import React from 'react';
import { ButtonType } from '../types/calculator';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'number',
  className = '',
  disabled = false,
}) => {
  const getButtonStyles = () => {
    const baseStyles = 'h-16 rounded-xl font-semibold text-lg transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
    
    switch (type) {
      case 'operation':
        return `${baseStyles} bg-gradient-to-b from-orange-400 to-orange-500 hover:from-orange-300 hover:to-orange-400 text-white shadow-lg hover:shadow-xl`;
      case 'function':
        return `${baseStyles} bg-gradient-to-b from-gray-300 to-gray-400 hover:from-gray-200 hover:to-gray-300 text-gray-900 shadow-lg hover:shadow-xl`;
      case 'memory':
        return `${baseStyles} bg-gradient-to-b from-blue-400 to-blue-500 hover:from-blue-300 hover:to-blue-400 text-white shadow-lg hover:shadow-xl`;
      case 'clear':
        return `${baseStyles} bg-gradient-to-b from-red-400 to-red-500 hover:from-red-300 hover:to-red-400 text-white shadow-lg hover:shadow-xl`;
      default:
        return `${baseStyles} bg-gradient-to-b from-gray-100 to-gray-200 hover:from-white hover:to-gray-100 text-gray-900 shadow-lg hover:shadow-xl border border-gray-300`;
    }
  };

  return (
    <button
      className={`${getButtonStyles()} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};