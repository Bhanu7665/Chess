import React from 'react';
import { Crown } from 'lucide-react';

interface GameSetupProps {
  onStartGame: (player1: string, player2: string, player1Color: 'white' | 'black') => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  const [player1, setPlayer1] = React.useState('');
  const [player2, setPlayer2] = React.useState('');
  const [player1Color, setPlayer1Color] = React.useState<'white' | 'black'>('white');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (player1 && player2) {
      onStartGame(player1, player2, player1Color);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl">
      <div className="flex items-center justify-center mb-6">
        <Crown className="w-12 h-12 text-amber-600" />
      </div>
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Chess Game Setup</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="player1" className="block text-sm font-medium text-gray-700 mb-1">
            Player 1
          </label>
          <input
            type="text"
            id="player1"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Enter name"
            required
          />
        </div>
        <div>
          <label htmlFor="player2" className="block text-sm font-medium text-gray-700 mb-1">
            Player 2
          </label>
          <input
            type="text"
            id="player2"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Enter name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Player 1 Color
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={player1Color === 'white'}
                onChange={() => setPlayer1Color('white')}
                className="mr-2"
              />
              White
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={player1Color === 'black'}
                onChange={() => setPlayer1Color('black')}
                className="mr-2"
              />
              Black
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors font-medium"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default GameSetup;