import { LazyLoadImage } from "react-lazy-load-image-component";
import { User } from "../../types/posts";

interface AccountItemProps {
  account: User;
}

const AccountItem: React.FC<AccountItemProps> = ({ account }) => {
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
      <button className="p-2 text-blue-500 font-semibold text-sm">
        Follow
      </button>
    </div>
  );
};

export default AccountItem;
