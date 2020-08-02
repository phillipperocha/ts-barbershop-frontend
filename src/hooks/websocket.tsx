import React, { createContext, useCallback, useState, useEffect } from 'react';
import io from 'socket.io-client';

import { useAuth } from './auth';

interface WebSocketContextData {
  getSocket(): SocketIOClient.Socket | undefined;
}

const WebSocketContext = createContext<WebSocketContextData>(
  {} as WebSocketContextData
);

const WebSocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const { user } = useAuth();

  useEffect(() => {
    if (!socket && user) {
      const webSocket = io(`${process.env.REACT_APP_API_URL}`, {
        query: {
          token: localStorage.getItem('@Barbershop:token'),
        },
      });

      webSocket.on('connect', () => {
        console.log('conectado fera');
      });
      setSocket(webSocket);
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user, socket]);

  const getSocket = useCallback((): SocketIOClient.Socket | undefined => {
    return socket;
  }, [socket]);

  return (
    <WebSocketContext.Provider value={{ getSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketProvider };
