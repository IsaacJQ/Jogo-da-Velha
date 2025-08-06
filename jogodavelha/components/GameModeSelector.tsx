
import React from 'react';
import type { GameMode } from '../types';

interface GameModeSelectorProps {
  onSelectMode: (mode: GameMode) => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Gemini Tic-Tac-Toe</h1>
        <p className="text-slate-400 mb-8 max-w-md">Choose your opponent. Play against a friend or challenge our expert AI powered by Gemini.</p>
        <div className="flex space-x-4">
            <button
                onClick={() => onSelectMode('pvp')}
                className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
            >
                Player vs Player
            </button>
            <button
                onClick={() => onSelectMode('pva')}
                className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
            >
                Player vs AI
            </button>
        </div>
    </div>
  );
};

export default GameModeSelector;
