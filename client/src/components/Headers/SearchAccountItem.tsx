import ImageFade from "../ImageFade";
import { User } from "../../types";
import { Link } from "react-router-dom";

interface SearchAccountItemProps {
  account: User;
}

const SearchAccountItem: React.FC<SearchAccountItemProps> = ({ account }) => {
  return (
    <Link
      to={`/profile/${account?._id}`}
      className="flex items-center space-x-3"
    >
      <ImageFade
        className="w-[35px] h-[35px] rounded-full"
        src={account?.avatar}
      />
      <div className="text-sm">
        <h3 className="font-semibold">{account?.username}</h3>
        <p className="text-gray-500">{account?.fullname}</p>
      </div>
    </Link>
  );
};

export default SearchAccountItem;
