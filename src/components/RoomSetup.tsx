import React, { useState } from 'react';
import { Crown, Copy } from 'lucide-react';
import { nanoid } from 'nanoid';

interface RoomSetupProps {
  onJoinRoom: (roomId: string, playerName: string) => void;
  onCreateRoom: (roomId: string, playerName: string) => void;
}

const RoomSetup: React.FC<RoomSetupProps> = ({ onJoinRoom, onCreateRoom }) => {
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isCreating, setIsCreating] = useState(true);
  const [generatedRoomId, setGeneratedRoomId] = useState('');
  const [showGeneratedRoom, setShowGeneratedRoom] = useState(false);

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const newRoomId = nanoid(6);
    setGeneratedRoomId(newRoomId);
    setShowGeneratedRoom(true);
    onCreateRoom(newRoomId, playerName);
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    onJoinRoom(roomId, playerName);
  };

  const copyRoomId = (id: string) => {
    navigator.clipboard.writeText(id);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl">
      <div className="flex items-center justify-center mb-6">
        <Crown className="w-12 h-12 text-amber-600" />
      </div>
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Chess Room Setup
      </h2>

      {showGeneratedRoom ? (
        <div className="mb-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <h3 className="text-lg font-semibold mb-2 text-amber-800">Room Created!</h3>
          <div className="flex items-center justify-between bg-white p-3 rounded-md">
            <span className="font-mono font-bold text-lg">{generatedRoomId}</span>
            <button
              onClick={() => copyRoomId(generatedRoomId)}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              title="Copy room ID"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <p className="mt-2 text-sm text-amber-700">
            Share this room ID with your friend to start playing!
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <button
              onClick={() => setIsCreating(true)}
              className={`mr-4 px-4 py-2 rounded-lg ${
                isCreating
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Create Room
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className={`px-4 py-2 rounded-lg ${
                !isCreating
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Join Room
            </button>
          </div>

          <form onSubmit={isCreating ? handleCreateRoom : handleJoinRoom} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {!isCreating && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room ID
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Enter room ID"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => copyRoomId(roomId)}
                    className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors font-medium"
            >
              {isCreating ? 'Create Room' : 'Join Room'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default RoomSetup;