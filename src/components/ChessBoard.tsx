import React from 'react';
import { Board, Position, PieceColor } from '../types/chess';

interface ChessBoardProps {
  board: Board;
  selectedPosition: Position | null;
  currentPlayer: PieceColor;
  onSquareClick: (position: Position) => void;
}

const ChessBoard: React.FC<ChessBoardProps> = ({
  board,
  selectedPosition,
  currentPlayer,
  onSquareClick,
}) => {
  const getPieceSymbol = (piece: any) => {
    if (!piece) return '';
    const symbols: Record<string, string> = {
      'white-king': '♔',
      'white-queen': '♕',
      'white-rook': '♖',
      'white-bishop': '♗',
      'white-knight': '♘',
      'white-pawn': '♙',
      'black-king': '♚',
      'black-queen': '♛',
      'black-rook': '♜',
      'black-bishop': '♝',
      'black-knight': '♞',
      'black-pawn': '♟︎',
    };
    return (
      <span className={`${piece.color === 'white' ? 'text-gray-100' : 'text-gray-900'} 
        drop-shadow-md hover:drop-shadow-lg transition-all duration-200
        ${piece.type === 'king' ? 'text-5xl' : 'text-4xl'}`}>
        {symbols[`${piece.color}-${piece.type}`]}
      </span>
    );
  };

  return (
    <div className="inline-block bg-neutral-100 p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-8 gap-0 border-2 border-neutral-700">
        {board.map((row, y) =>
          row.map((piece, x) => {
            const isSelected = selectedPosition?.x === x && selectedPosition?.y === y;
            const isLight = (x + y) % 2 === 0;
            const canMove = piece?.color === currentPlayer;

            return (
              <div
                key={`${x}-${y}`}
                className={`
                  w-16 h-16 flex items-center justify-center
                  ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                  ${isSelected ? 'ring-4 ring-blue-400' : ''}
                  ${canMove ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}
                  transition-all duration-200
                `}
                onClick={() => onSquareClick({ x, y })}
              >
                {getPieceSymbol(piece)}
              </div>
            );
          })
        )}
      </div>
      <div className="mt-4 text-center text-lg font-semibold">
        {currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s turn
      </div>
    </div>
  );
};

export default ChessBoard;