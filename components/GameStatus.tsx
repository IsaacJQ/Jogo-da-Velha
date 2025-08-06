
import React from 'react';
import type { Winner } from '../types';

interface GameStatusProps {
  winner: Winner;
  xIsNext: boolean;
  isLoadingAI: boolean;
  gameMode: string | null;
}

const GameStatus: React.FC<GameStatusProps> = ({ winner, xIsNext, isLoadingAI, gameMode }) => {
  let status;

  if (winner) {
    status = winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`;
  } else if (isLoadingAI) {
    status = (
      <div className="flex items-center justify-center">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>AI is thinking...</span>
      </div>
    );
  } else {
    const nextPlayer = xIsNext ? 'X' : 'O';
    const playerLabel = gameMode === 'pva' ? (xIsNext ? 'Your Turn (X)' : 'AI Turn (O)') : `Next player: ${nextPlayer}`;
    status = playerLabel;
  }

  const winnerColor = winner === 'X' ? 'text-cyan-400' : winner === 'O' ? 'text-yellow-400' : 'text-slate-100';

  return (
    <div className={`text-2xl md:text-3xl font-bold my-6 h-10 flex items-center justify-center transition-colors duration-300 ${winner ? winnerColor : ''}`}>
      {status}
    </div>
  );
};

export default GameStatus;
