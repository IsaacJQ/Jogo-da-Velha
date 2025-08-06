
import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import GameModeSelector from './components/GameModeSelector';
import { getAIMove } from './services/geminiService';
import type { BoardState, Player, WinnerInfo, GameMode, Winner } from './types';

const calculateWinner = (squares: BoardState): WinnerInfo => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6], // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] as Player, line: lines[i] };
    }
  }
  return { winner: null, line: null };
};

const App: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winnerInfo, setWinnerInfo] = useState<WinnerInfo>({ winner: null, line: null });
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);

  const winner: Winner = winnerInfo.winner || (!board.includes(null) ? 'Draw' : null);

  const handleAIMove = useCallback(async (currentBoard: BoardState) => {
    if (winner || xIsNext || gameMode !== 'pva') return;

    setIsLoadingAI(true);
    const aiMove = await getAIMove(currentBoard);
    setIsLoadingAI(false);

    if (aiMove !== null && currentBoard[aiMove] === null) {
      const newBoard = [...currentBoard];
      newBoard[aiMove] = 'O';
      setBoard(newBoard);
      setXIsNext(true);
    }
  }, [winner, xIsNext, gameMode]);

  useEffect(() => {
    const newWinnerInfo = calculateWinner(board);
    setWinnerInfo(newWinnerInfo);

    if (!newWinnerInfo.winner && gameMode === 'pva' && !xIsNext) {
      const timeoutId = setTimeout(() => handleAIMove(board), 500);
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, gameMode, xIsNext]);


  const handleSquareClick = (i: number) => {
    if (winner || board[i] || isLoadingAI) {
      return;
    }

    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };
  
  const resetGame = (mode: GameMode) => {
    setGameMode(mode);
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinnerInfo({ winner: null, line: null });
    setIsLoadingAI(false);
  };

  const handleSelectMode = (mode: GameMode) => {
    resetGame(mode);
  };
  
  const handleMainMenu = () => {
    setGameMode(null);
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinnerInfo({ winner: null, line: null });
  };


  if (!gameMode) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <GameModeSelector onSelectMode={handleSelectMode} />
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <header className="mb-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
                {gameMode === 'pva' ? 'Player vs AI' : 'Player vs Player'}
            </h1>
        </header>
        <main className="flex flex-col items-center">
            <GameStatus winner={winner} xIsNext={xIsNext} isLoadingAI={isLoadingAI} gameMode={gameMode} />
            <Board squares={board} onClick={handleSquareClick} winningLine={winnerInfo.line} />
            <div className="mt-8 flex space-x-4">
              <button 
                  onClick={() => resetGame(gameMode)}
                  className="px-6 py-2 bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-75 transition-all"
              >
                  {winner ? 'Play Again' : 'Restart'}
              </button>
               <button 
                  onClick={handleMainMenu}
                  className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-all"
              >
                  Main Menu
              </button>
            </div>
        </main>
    </div>
  );
};

export default App;
