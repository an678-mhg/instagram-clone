import { createContext, useContext, useEffect, useRef } from "react";
import { Layout } from "../types";
import { AuthContext } from "./AuthContext";
import { io, Socket } from "socket.io-client";

interface SocketContextValue {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextValue>({
  socket: null,
});

const SocketContextProvider: React.FC<Layout> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    socketRef.current = io(import.meta.env.VITE_SOCKET_URL as string);

    socketRef.current?.emit("new-connection", user);

    socketRef.current?.on("return-users", (users) => {
      console.log(users);
    });
  }, [user?._id, socketRef.current]);

  console.log(socketRef.current);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
