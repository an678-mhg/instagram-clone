import { LazyLoadImage } from "react-lazy-load-image-component";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";

const AccountProfile = () => {
  const { user } = useContext(AuthContext);
  const { isLoading, handleLogout } = useLogout();

  return (
    <div className="flex items-center justify-between px-4 py-2 last:mb-0">
      <div className="flex items-center">
        <img
          loading="lazy"
          className="w-[42px] h-[42px] rounded-full"
          src={user?.avatar}
        />
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-black">{user?.username}</h3>
          <p className="text-sm font-normal text-gray-400">{user?.fullname}</p>
        </div>
      </div>
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
