import { Link } from "react-router-dom";
import LogoImage from "../../icons/LogoImage";
import SearchBox from "./SearchBox";
import { useQuery } from "react-query";
import { notificationKey } from "../../utils/react-query-key";
import { getNotification } from "../../services/notifications";
import { CircularProgress } from "react-cssfx-loading";
import { useMemo } from "react";
import Tippy from "@tippyjs/react/headless";
import BoxNotification from "../Notifications/BoxNotification";
import { Notification as NotificationType } from "../../types/notification";
import Notification from "../../icons/Notification";
import { useState } from "react";

const Headers = () => {
  const { data, isLoading } = useQuery(
    [notificationKey.GET_NOTIFICATION],
    getNotification
  );

  const countNotification = useMemo(() => {
    return data?.notifications?.filter((notification) => !notification.read)
      ?.length;
  }, [data?.notifications?.length]) as number;

  const [showBoxNotification, setShowBoxNotification] = useState(false);

  return (
    <div className="py-2 sticky top-0 z-[9999] bg-black px-4 border-b border-l border-[#262626] w-full flex items-center justify-between">
      <Link to="/">
        <LogoImage className="md:hidden block" />
      </Link>
      <SearchBox />
      <Tippy
        onClickOutside={() => setShowBoxNotification(false)}
        placement="bottom-end"
        interactive
        visible={showBoxNotification}
        render={(attrs) =>
          showBoxNotification && (
            <BoxNotification
              notifications={data?.notifications as NotificationType[]}
              {...attrs}
            />
          )
        }
      >
        <div
          onClick={() => setShowBoxNotification((prev) => !prev)}
          className="relative cursor-pointer"
        >
          <Notification />
          {countNotification > 0 && (
            <p className="absolute text-xs text-white w-[20px] h-[20px] flex items-center justify-center rounded-full bg-red-500 top-[-10px] right-[-10px]">
              {isLoading ? (
                <CircularProgress width={10} height={10} color="#fff" />
              ) : (
                countNotification
              )}
            </p>
          )}
        </div>
      </Tippy>
    </div>
  );
};

export default Headers;
