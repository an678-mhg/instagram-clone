import { Notification } from "../../types/notification";
import NotificationItem from "./NotificationItem";

interface BoxNotificationProps {
  notifications: Notification[];
}

const BoxNotification: React.FC<BoxNotificationProps> = ({ notifications }) => {
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
    <div className="w-[350px] h-[350px] md:w-[400px] md:h-[400px] rounded-md bg-[#111] overflow-y-auto">
      {notifications?.map((item) => (
        <NotificationItem notification={item} key={item._id} />
      ))}
    </div>
  );
};

export default BoxNotification;
