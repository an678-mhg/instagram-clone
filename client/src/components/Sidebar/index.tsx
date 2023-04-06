import Logo from "../../assets/images/Logo";
import { Link } from "react-router-dom";
import LogoImage from "../../assets/images/LogoImage";
import SidebarItem from "./SidebarItem";
import { sidebars } from "../../utils/contants";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import useLogout from "../../hooks/useLogout";
import { FiLogOut } from "react-icons/fi";
import Create from "../../assets/icons/Create";
import { CreatePostModalContext } from "../../context/CreatePostModalContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const { setIsOpen } = useContext(CreatePostModalContext);
  const { handleLogout, isLoading } = useLogout();

  return (
    <div
      className={`md:px-3 md:py-3 border-t md:border-t-transparent transition-all flex lg:w-[245px] md:w-auto z-[9999] bg-white md:flex-col flex-row justify-between border-r border-gray-200 w-full md:h-screen fixed md:top-0 bottom-0 left-0`}
    >
      <div className="flex md:flex-col flex-row md:flex-initial flex-1">
        <Link to="/" className="md:block hidden">
          <Logo className="py-6 px-3 mb-4 lg:block hidden text-black" />
          <LogoImage className="py-6 px-3 mb-4 lg:hidden block text-black" />
        </Link>
        <div className="flex md:flex-col flex-row flex-1 justify-between">
          {sidebars?.map((sidebar) => (
            <SidebarItem key={sidebar.href} sidebar={sidebar} />
          ))}
          <div
            onClick={() => setIsOpen(true)}
            className={`flex md:justify-start justify-center items-center w-full text-black p-3 md:rounded-full hover:bg-gray-100 md:mb-2 transition-colors cursor-pointer last:mb-0`}
          >
            <Create />
            <span className="lg:block hidden text-[16px] text-black ml-4">
              Create
            </span>
          </div>
          <Link
            to={`/profile/${user?._id}`}
            className="flex md:justify-start justify-center items-center w-full p-3 md:rounded-full hover:bg-gray-100 text-black mb-2 transition-colors cursor-pointer last:mb-0"
          >
            <img
              loading="lazy"
              className="w-6 h-6 rounded-full"
              alt={user?.username}
              src={user?.avatar}
            />
            <span className="lg:block hidden text-[16px] text-black ml-4">
              Profile
            </span>
          </Link>
        </div>
      </div>
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="md:flex hidden items-center p-3 rounded-full hover:bg-gray-100 mb-2 transition-colors cursor-pointer last:mb-0"
      >
        <FiLogOut className="text-black w-6 h-6" />
        <span className="lg:block hidden text-[16px] ml-4 text-black">
          Logout
        </span>
      </button>
    </div>
  );
};

export default Sidebar;
