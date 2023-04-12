import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import ImageFade from "../ImageFade";

const AccountProfile = () => {
  const { user } = useContext(AuthContext);
  const { isLoading, handleLogout } = useLogout();

  return (
    <div className="flex items-center justify-between px-4 py-2 last:mb-0">
      <Link to={`/profile/${user?._id}`} className="flex items-center">
        <ImageFade
          loading="lazy"
          className="w-[50px] h-[50px] rounded-full"
          src={user?.avatar}
        />
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-white">{user?.username}</h3>
          <p className="text-sm font-normal text-gray-400">{user?.fullname}</p>
        </div>
      </Link>
      <button
        disabled={isLoading}
        onClick={handleLogout}
        className="p-2 text-blue-500 font-semibold text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default AccountProfile;
