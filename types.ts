
export type Player = 'X' | 'O';
export type SquareValue = Player | null;
export type BoardState = SquareValue[];
export type GameMode = 'pvp' | 'pva' | null;
export type Winner = Player | 'Draw' | null;

export interface WinnerInfo {
  winner: Player | null;
  line: number[] | null;
}
