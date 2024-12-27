import React from 'react';
import { PieceColor } from '../types/chess';

interface GameStatusProps {
  currentPlayer: PieceColor;
  player1: string;
  player2: string;
  player1Color: PieceColor;
}

const GameStatus: React.FC<GameStatusProps> = ({
  currentPlayer,
  player1,
  player2,
  player1Color,
}) => {
  const getCurrentPlayerName = () => {
    if (currentPlayer === player1Color) {
      return player1;
    }
    return player2;
  };

  return (
    <div className="mt-4 text-center">
      <div className="text-lg font-semibold text-gray-800">
        {getCurrentPlayerName()}'s turn
      </div>
      <div className="text-sm text-gray-600">
        Playing as {currentPlayer}
      </div>
    </div>
  );
};

export default GameStatus;