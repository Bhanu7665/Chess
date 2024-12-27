import { Board, Piece, Position, PieceColor } from '../types/chess';

export const createInitialBoard = (): Board => {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Initialize pawns
  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: 'pawn', color: 'black', position: { x: i, y: 1 }, hasMoved: false };
    board[6][i] = { type: 'pawn', color: 'white', position: { x: i, y: 6 }, hasMoved: false };
  }

  // Initialize other pieces
  const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  pieces.forEach((type, i) => {
    board[0][i] = { type, color: 'black', position: { x: i, y: 0 }, hasMoved: false };
    board[7][i] = { type, color: 'white', position: { x: i, y: 7 }, hasMoved: false };
  });

  return board;
};

export const isValidPosition = (pos: Position): boolean => {
  return pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8;
};

export const getPiece = (board: Board, pos: Position): Piece | null => {
  return board[pos.y][pos.x];
};

export const isValidMove = (board: Board, from: Position, to: Position, currentPlayer: PieceColor): boolean => {
  const piece = getPiece(board, from);
  if (!piece || piece.color !== currentPlayer) return false;
  
  const targetPiece = getPiece(board, to);
  if (targetPiece && targetPiece.color === currentPlayer) return false;

  switch (piece.type) {
    case 'pawn':
      return isValidPawnMove(board, from, to, piece.color);
    case 'rook':
      return isValidRookMove(board, from, to);
    case 'knight':
      return isValidKnightMove(from, to);
    case 'bishop':
      return isValidBishopMove(board, from, to);
    case 'queen':
      return isValidQueenMove(board, from, to);
    case 'king':
      return isValidKingMove(from, to);
    default:
      return false;
  }
};

const isValidPawnMove = (board: Board, from: Position, to: Position, color: PieceColor): boolean => {
  const direction = color === 'white' ? -1 : 1;
  const startRow = color === 'white' ? 6 : 1;
  
  // Forward movement
  if (from.x === to.x) {
    if (to.y === from.y + direction && !getPiece(board, to)) {
      return true;
    }
    if (from.y === startRow && to.y === from.y + 2 * direction) {
      const intermediate = { x: from.x, y: from.y + direction };
      return !getPiece(board, intermediate) && !getPiece(board, to);
    }
  }
  
  // Capture
  if (Math.abs(to.x - from.x) === 1 && to.y === from.y + direction) {
    const targetPiece = getPiece(board, to);
    return !!targetPiece && targetPiece.color !== color;
  }
  
  return false;
};

const isValidRookMove = (board: Board, from: Position, to: Position): boolean => {
  if (from.x !== to.x && from.y !== to.y) return false;
  
  const dx = Math.sign(to.x - from.x);
  const dy = Math.sign(to.y - from.y);
  let x = from.x + dx;
  let y = from.y + dy;
  
  while (x !== to.x || y !== to.y) {
    if (getPiece(board, { x, y })) return false;
    x += dx;
    y += dy;
  }
  
  return true;
};

const isValidKnightMove = (from: Position, to: Position): boolean => {
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);
  return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
};

const isValidBishopMove = (board: Board, from: Position, to: Position): boolean => {
  if (Math.abs(to.x - from.x) !== Math.abs(to.y - from.y)) return false;
  
  const dx = Math.sign(to.x - from.x);
  const dy = Math.sign(to.y - from.y);
  let x = from.x + dx;
  let y = from.y + dy;
  
  while (x !== to.x && y !== to.y) {
    if (getPiece(board, { x, y })) return false;
    x += dx;
    y += dy;
  }
  
  return true;
};

const isValidQueenMove = (board: Board, from: Position, to: Position): boolean => {
  return isValidRookMove(board, from, to) || isValidBishopMove(board, from, to);
};

const isValidKingMove = (from: Position, to: Position): boolean => {
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);
  return dx <= 1 && dy <= 1;
};