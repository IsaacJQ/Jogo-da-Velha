
import React from 'react';
import type { SquareValue } from '../types';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinning: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinning }) => {
  const valueColor = value === 'X' ? 'text-cyan-400' : 'text-yellow-400';
  const winningBg = isWinning ? 'bg-emerald-500' : 'bg-slate-800 hover:bg-slate-700';
  
  return (
    <button
      className={`w-20 h-20 md:w-28 md:h-28 m-1 rounded-lg flex items-center justify-center text-5xl md:text-6xl font-bold transition-all duration-200 ease-in-out transform hover:scale-105 ${winningBg}`}
      onClick={onClick}
      aria-label={`Square with value ${value || 'empty'}`}
    >
      <span className={`${valueColor} transition-transform duration-300 ${value ? 'scale-100' : 'scale-0'}`}>
        {value}
      </span>
    </button>
  );
};

export default Square;
