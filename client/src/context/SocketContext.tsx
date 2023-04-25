import { createContext, useContext, useEffect, useRef } from "react";
import { Layout, User } from "../types";
import { AuthContext } from "./AuthContext";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "react-query";
import {
  Notification as NotificationType,
  NotificationResponse,
} from "../types/notification";
import { notificationKey } from "../utils/react-query-key";

interface SocketContextValue {
  socketRef: React.MutableRefObject<Socket | null>;
}

export const SocketContext = createContext<SocketContextValue>({
  socketRef: { current: null },
});

const SocketContextProvider: React.FC<Layout> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  // const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL as string);
  }, [user?._id, socketRef.current]);

  useEffect(() => {
    socketRef.current?.emit("new-connection", user);
  }, [user?._id, socketRef.current]);

  useEffect(() => {
    socketRef.current?.on("return-users", (users: User[]) => {
      console.log(users);
    });
  }, [user?._id, socketRef.current]);

  useEffect(() => {
    socketRef.current?.on(
      "new-notification",
      (notification: NotificationType) => {
        if (Notification.permission === "granted") {
          const notify = new Notification(
            `${notification.from_user?.username}`,
            {
              body: notification.message,
              image: notification?.from_user?.avatar,
              icon: "/images/logo-gradient.png",
            }
          );

          notify.onclick = () => {
            // @ts-ignore
            window.location = notification.url;
          };
        }

        const key = notificationKey.GET_NOTIFICATION;
        const newData = queryClient.getQueryData([key]) as NotificationResponse;
        if (newData) {
          newData.notifications.unshift(notification);
          queryClient.setQueryData([key], newData);
        }
      }
    );
  }, [user?._id, socketRef.current]);

  return (
    <SocketContext.Provider value={{ socketRef: socketRef }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
