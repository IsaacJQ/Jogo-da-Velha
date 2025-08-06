
import React from 'react';
import type { BoardState } from '../types';
import Square from './Square';

interface BoardProps {
  squares: BoardState;
  onClick: (i: number) => void;
  winningLine: number[] | null;
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine }) => {
  const renderSquare = (i: number) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={winningLine?.includes(i) ?? false}
      />
    );
  };

  return (
    <div className="grid grid-cols-3 gap-1 p-2 bg-slate-900/50 rounded-lg">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => renderSquare(i))}
    </div>
  );
};

export default Board;
