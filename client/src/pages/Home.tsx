import { useEffect } from "react";
import { useWebSocket } from "../context/webSocketContext";
import { useUser } from "../context/userContext";

const Home = () => {
  const socket = useWebSocket();
  const { user } = useUser();
  useEffect(() => {
    if (user?.email && socket) {
      socket.emit("register", user.email);
    }
  }, [socket]);
  return <div>Home</div>;
};

export default Home;
