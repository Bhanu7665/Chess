import { useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { Move } from '../types/chess';

// Use environment variable for the socket URL, fallback to localhost for development
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

export const useMultiplayer = () => {
  const socket: Socket = io(SOCKET_URL);

  const createRoom = useCallback((roomId: string, playerName: string) => {
    socket.emit('createRoom', { roomId, playerName });
  }, [socket]);

  const joinRoom = useCallback((roomId: string, playerName: string) => {
    socket.emit('joinRoom', { roomId, playerName });
  }, [socket]);

  const makeMove = useCallback((roomId: string, move: Move) => {
    socket.emit('move', { roomId, move });
  }, [socket]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return {
    socket,
    createRoom,
    joinRoom,
    makeMove
  };
};