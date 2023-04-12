import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { followUser } from "../../services/follow";
import { User } from "../../types/posts";
import { accountKey } from "../../utils/react-query-key";
import { createNotification } from "../../services/notifications";
import { SocketContext } from "../../context/SocketContext";
import ImageFade from "../ImageFade";

interface AccountItemProps {
  account: User;
  isFetching: boolean;
}

const AccountItem: React.FC<AccountItemProps> = ({ account, isFetching }) => {
  const { user } = useContext(AuthContext);
  const { socketRef } = useContext(SocketContext);
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(followUser, {
    onError: () => {
      toast.error("Something went wrong!");
    },
    onSuccess: async (response: any) => {
      if (response?.action === "unfollow") return;

      const notification = await createNotification({
        comment: null,
        post: null,
        user: [account?._id as string],
        message: "just followed you",
        url: `/profile/${user?._id}`,
      });

      socketRef?.current?.emit("create-new-notification", notification);
    },
  });

  const handleFollowUser = () => {
    if (!user) return toast.error("You need login to follow user!");

    const oldData = queryClient.getQueryData([
      accountKey.GET_SUGGEST_ACCOUNT,
    ]) as User[];

    queryClient.setQueryData(
      [accountKey.GET_SUGGEST_ACCOUNT],
      oldData?.map((item) =>
        item._id === account._id
          ? { ...item, is_follow: !item.is_follow }
          : { ...item }
      )
    );

    mutateAsync(account._id);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 last:mb-0">
      <Link to={`/profile/${account?._id}`} className="flex items-center">
        <ImageFade
          loading="lazy"
          className="w-[35px] h-[35px] rounded-full"
          src={account.avatar}
        />
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-white">
            {account.username}
          </h3>
          <p className="text-sm font-normal text-gray-400">
            {account.fullname}
          </p>
        </div>
      </Link>
      {user?._id !== account._id && (
        <button
          disabled={isFetching}
          onClick={handleFollowUser}
          className={`p-2 ${
            account.is_follow ? "text-gray-600" : "text-blue-500"
          } font-semibold text-sm`}
        >
          {account.is_follow ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default AccountItem;
