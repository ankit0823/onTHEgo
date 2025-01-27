import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketDataContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Replace with your server URL

const SocketContext = ({ children }) => {
//   const [socket, setSocket] = useState(null);
    
  useEffect(() => {

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

  }, []);

  return (
    <SocketDataContext.Provider value={{ socket }}>
      {children}
    </SocketDataContext.Provider>
  );
};

export default SocketContext;
