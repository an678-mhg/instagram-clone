import { useQueryClient } from "react-query";
import { Notification, NotificationResponse } from "../../types/notification";
import NotificationItem from "./NotificationItem";
import { useEffect } from "react";
import { notificationKey } from "../../utils/react-query-key";
import { updateStatusSeen } from "../../services/notifications";

interface BoxNotificationProps {
  notifications: Notification[];
}

const BoxNotification: React.FC<BoxNotificationProps> = ({ notifications }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const key = notificationKey.GET_NOTIFICATION;
    const newData = queryClient.getQueryData([key]) as NotificationResponse;
    if (newData?.notifications?.some((item) => !item.read)) {
      queryClient.setQueryData([key], {
        ...newData,
        notifications: newData?.notifications.map((item) => ({
          ...item,
          read: true,
        })),
      });
      updateStatusSeen();
    }
  }, [notifications]);

  if (notifications?.length === 0) {
    return (
      <div className="w-[350px] h-[350px] md:w-[400px] md:h-[400px] bg-[#111] flex rounded-md items-center justify-center">
        <h1 className="text-sm font-semibold">
          There are no recent notifications!
        </h1>
      </div>
    );
  }

  return (
    <div className="w-[350px] h-[300px] md:w-[400px] md:h-[300px] rounded-md bg-[#111] overflow-y-auto">
      {notifications?.map((item) => (
        <NotificationItem notification={item} key={item._id} />
      ))}
    </div>
  );
};

export default BoxNotification;
