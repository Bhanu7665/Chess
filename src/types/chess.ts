export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';
export type GameStatus = 'setup' | 'playing' | 'checkmate';

export interface Position {
  x: number;
  y: number;
}

export interface Piece {
  type: PieceType;
  color: PieceColor;
  position: Position;
  hasMoved: boolean;
}

export type Board = (Piece | null)[][];

export interface Move {
  from: Position;
  to: Position;
}