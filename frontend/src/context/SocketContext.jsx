import React, { createContext, useEffect, useMemo } from 'react';
import socketService from '../services/socket';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    socketService.connect();
    return () => {
      socketService.disconnect();
    };
  }, []);

  const value = useMemo(() => ({
    socket: socketService,
    isConnected: socketService.isConnected,
  }), []);

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
