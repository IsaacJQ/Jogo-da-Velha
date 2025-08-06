
import { GoogleGenAI, Type } from "@google/genai";
import type { BoardState } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI functionality will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getAIMove = async (board: BoardState): Promise<number | null> => {
  if (!process.env.API_KEY) {
    // Fallback to a simple random move if API key is not available
    console.log("No API key, using random move fallback.");
    const availableMoves = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val): val is number => val !== null);
    if (availableMoves.length === 0) return null;
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  const boardString = board.map(p => p || '_').join(', ');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `The current Tic-Tac-Toe board is [${boardString}]. You are player 'O'. Make the next move.`,
      config: {
        systemInstruction: "You are a Tic-Tac-Toe expert. Your role is to play as 'O'. The user, 'X', will provide the current board state. You must respond with only a JSON object containing the index (0-8) of the best possible move. The board is a 1D array. Do not choose an occupied square.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            move: {
              type: Type.INTEGER,
              description: "The board index (0-8) for your next move as player 'O'."
            }
          },
          required: ["move"]
        },
        thinkingConfig: { thinkingBudget: 0 } 
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    const move = result.move;

    if (typeof move === 'number' && move >= 0 && move <= 8 && board[move] === null) {
      return move;
    } else {
      console.error("AI returned an invalid move:", move);
      return null;
    }

  } catch (error) {
    console.error("Error fetching AI move from Gemini:", error);
    // Fallback to random move on API error
    const availableMoves = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val): val is number => val !== null);
    if (availableMoves.length > 0) {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    return null;
  }
};
