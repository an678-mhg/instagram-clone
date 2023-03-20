import { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMutation, useQueryClient } from "react-query";
import { AuthContext } from "../../context/AuthContext";
import { followUser } from "../../services/follow";
import { User } from "../../types/posts";

interface AccountItemProps {
  account: User;
  isFetching: boolean;
}

const AccountItem: React.FC<AccountItemProps> = ({ account, isFetching }) => {
  const { user } = useContext(AuthContext);
  const [follow, setFollow] = useState(account.is_follow);
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(followUser, {
    onError: () => {
      setFollow((prev) => !prev);
      toast.error("Something went wrong!");
    },
  });

  const handleFollowUser = () => {
    if (!user) return toast.error("You need login to follow user!");
    setFollow((prev) => !prev);
    mutateAsync(account._id);
  };

  useEffect(() => {
    setFollow(account.is_follow);
  }, [account.is_follow]);

  return (
    <div className="flex items-center justify-between px-4 py-2 last:mb-0">
      <div className="flex items-center">
        <LazyLoadImage
          effect="blur"
          className="w-[35px] h-[35px] rounded-full"
          src={account.avatar}
        />
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-black">
            {account.username}
          </h3>
          <p className="text-sm font-normal text-gray-400">
            {account.fullname}
          </p>
        </div>
      </div>
      {user?._id !== account._id && (
        <button
          disabled={isFetching}
          onClick={handleFollowUser}
          className={`p-2 ${
            follow ? "text-gray-600" : "text-blue-500"
          } font-semibold text-sm`}
        >
          {follow ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default AccountItem;
