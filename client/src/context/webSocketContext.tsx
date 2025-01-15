import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { disconnectSocket, initializeSocket } from "../dependencies/socket";

const WebSocketContext = createContext<Socket | null>(null);
const newSocket = initializeSocket();
export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(newSocket);

  useEffect(() => {
    newSocket.connect();
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
        disconnectSocket();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const socket = useContext(WebSocketContext);
  if (!socket) {
    throw new Error("useWebSocket must be used within its provider");
  }
  return socket;
};
