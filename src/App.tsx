import React, { useState, useEffect } from 'react';
import ChessBoard from './components/ChessBoard';
import GameOver from './components/GameOver';
import RoomSetup from './components/RoomSetup';
import GameStatus from './components/GameStatus';
import { Board, Position, PieceColor, GameStatus as GameStatusType } from './types/chess';
import { createInitialBoard, isValidMove } from './utils/boardUtils';
import { useMultiplayer } from './hooks/useMultiplayer';

function App() {
  const [board, setBoard] = useState<Board>(createInitialBoard());
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white');
  const [gameStatus, setGameStatus] = useState<GameStatusType>('setup');
  const [winner, setWinner] = useState<PieceColor | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState<string>('');
  const [opponent, setOpponent] = useState<string>('');
  const [playerColor, setPlayerColor] = useState<PieceColor>('white');

  const { socket, createRoom, joinRoom, makeMove } = useMultiplayer();

  useEffect(() => {
    if (!socket) return;

    socket.on('roomCreated', ({ roomId }) => {
      setRoomId(roomId);
      setGameStatus('waiting');
    });

    socket.on('playerJoined', ({ players }) => {
      const opponent = players.find(p => p.name !== playerName);
      if (opponent) {
        setOpponent(opponent.name);
      }
    });

    socket.on('gameStart', ({ players }) => {
      setGameStatus('playing');
      const isFirstPlayer = players[0].name === playerName;
      setPlayerColor(isFirstPlayer ? 'white' : 'black');
    });

    socket.on('moveMade', (move) => {
      handleMove(move.from, move.to, true);
    });

    socket.on('playerLeft', () => {
      setGameStatus('setup');
      setRoomId(null);
      setOpponent('');
    });

    return () => {
      socket.off('roomCreated');
      socket.off('playerJoined');
      socket.off('gameStart');
      socket.off('moveMade');
      socket.off('playerLeft');
    };
  }, [socket, playerName]);

  const handleCreateRoom = (newRoomId: string, name: string) => {
    setPlayerName(name);
    createRoom(newRoomId, name);
  };

  const handleJoinRoom = (roomId: string, name: string) => {
    setPlayerName(name);
    joinRoom(roomId, name);
  };

  const handleMove = (from: Position, to: Position, isRemoteMove = false) => {
    if (gameStatus !== 'playing') return;
    if (!isRemoteMove && currentPlayer !== playerColor) return;

    if (isValidMove(board, from, to, currentPlayer)) {
      const newBoard = board.map(row => [...row]);
      const piece = newBoard[from.y][from.x];
      const targetPiece = newBoard[to.y][to.x];
      
      if (piece) {
        if (targetPiece?.type === 'king') {
          setGameStatus('checkmate');
          setWinner(currentPlayer);
        }

        piece.position = to;
        piece.hasMoved = true;
        newBoard[to.y][to.x] = piece;
        newBoard[from.y][from.x] = null;
        
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');

        if (!isRemoteMove && roomId) {
          makeMove(roomId, { from, to });
        }
      }
    }
    setSelectedPosition(null);
  };

  const handleSquareClick = (position: Position) => {
    if (!selectedPosition) {
      const piece = board[position.y][position.x];
      if (piece && piece.color === currentPlayer && currentPlayer === playerColor) {
        setSelectedPosition(position);
      }
    } else {
      handleMove(selectedPosition, position);
    }
  };

  const resetGame = () => {
    setGameStatus('setup');
    setSelectedPosition(null);
    setCurrentPlayer('white');
    setWinner(null);
    setRoomId(null);
    setOpponent('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 flex flex-col items-center justify-center p-8">
      {gameStatus === 'setup' ? (
        <RoomSetup onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} />
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-8 text-amber-800">Chess Game</h1>
          {gameStatus === 'waiting' ? (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-xl mb-4">Waiting for opponent to join...</p>
              <p className="text-lg">Room ID: <span className="font-mono font-bold">{roomId}</span></p>
            </div>
          ) : (
            <>
              <ChessBoard
                board={board}
                selectedPosition={selectedPosition}
                currentPlayer={currentPlayer}
                onSquareClick={handleSquareClick}
              />
              <GameStatus
                currentPlayer={currentPlayer}
                player1={playerName}
                player2={opponent}
                player1Color={playerColor}
              />
              {gameStatus === 'checkmate' && winner && (
                <GameOver 
                  winner={winner} 
                  onReset={resetGame} 
                  winnerName={winner === playerColor ? playerName : opponent}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;