import { useNavigate } from "react-router-dom";
import { Notification } from "../../types/notification";
import calculateCreatedTime from "../../utils/formatDate";

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(notification.url)}
      className="text-white p-4 space-x-4 flex items-center justify-between cursor-pointer hover:bg-[#333] rounded-md"
    >
      <div className="flex items-center space-x-4 flex-1">
        <img
          src={notification?.from_user?.avatar}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <h3 className="text-sm line-clamp-1">
            <span className="font-semibold">
              {notification?.from_user?.username}
            </span>{" "}
            {notification.message}
          </h3>
          <p className="text-sm font-normal text-gray-500">
            {calculateCreatedTime(notification.createdAt)}
          </p>
        </div>
      </div>
      {!notification.read && (
        <div className="w-2 h-2 rounded-full bg-blue-500" />
      )}
    </div>
  );
};

export default NotificationItem;
