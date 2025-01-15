import { useEffect } from "react";
import { useWebSocket } from "../context/webSocketContext";

const useRegisterSocket = (userEmail: string) => {
  const socket = useWebSocket();

  useEffect(() => {
    if (userEmail && socket) {
      socket.emit("register", userEmail);
    }
  }, [socket, userEmail]);
};

export default useRegisterSocket;
