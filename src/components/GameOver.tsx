import React from 'react';
import { PieceColor } from '../types/chess';
import { Crown } from 'lucide-react';

interface GameOverProps {
  winner: PieceColor;
  winnerName: string;
  onReset: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ winner, winnerName, onReset }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h2 className="text-3xl font-bold mb-4">
          Game Over!
        </h2>
        <p className="text-xl mb-6">
          {winnerName} wins!
        </p>
        <button
          onClick={onReset}
          className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;