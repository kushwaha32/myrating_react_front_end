import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { baseSocket } from "../baseUrl";

const useSocketConnection = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(baseSocket);
    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  return socket;
};

export default useSocketConnection;
