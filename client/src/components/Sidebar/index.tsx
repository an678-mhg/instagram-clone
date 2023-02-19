import Logo from "../../assets/images/Logo";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import More from "../../assets/icons/More";
import LogoImage from "../../assets/images/LogoImage";
import { sidebars } from "../../utils/contants";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <div
      className={`md:px-3 md:py-3 px-2 py-1 border-t md:border-t-transparent transition-all flex lg:w-[245px] md:w-auto z-[9999] bg-white dark:bg-[#111] md:flex-col flex-row justify-between border-r border-gray-200 dark:border-[#ccc] w-full md:h-screen fixed md:top-0 bottom-0 left-0`}
    >
      <div className="flex md:flex-col flex-row md:flex-initial flex-1">
        <div className="md:block hidden">
          <Logo className="py-6 px-3 mb-4 lg:block hidden dark:text-white text-black" />
          <LogoImage className="py-6 px-3 mb-4 lg:hidden block dark:text-white text-black" />
        </div>
        <div className="flex md:flex-col flex-row flex-1 justify-between">
          {sidebars?.map((sidebar) => (
            <SidebarItem key={sidebar.href} sidebar={sidebar} />
          ))}
          <Link
            to="/profile"
            className="flex md:justify-start justify-center items-center w-full p-3 rounded-full hover:bg-gray-100 hover:dark:bg-[#222] dark:text-white text-black mb-2 transition-colors cursor-pointer last:mb-0"
          >
            <LazyLoadImage
              className="w-6 h-6 rounded-full"
              alt="Profile"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ZvHdn0DadjQB9oXbn9XXKvRdGQP6BSFJzw&usqp=CAU"
            />
            <span className="lg:block hidden text-[16px] text-black dark:text-white ml-4">
              Profile
            </span>
          </Link>
        </div>
      </div>
      <div className="md:flex hidden items-center p-3 rounded-full hover:bg-gray-100 hover:dark:bg-[#222] mb-2 transition-colors cursor-pointer last:mb-0">
        <More className="text-black dark:text-white" />
        <span className="lg:block hidden text-[16px] ml-4 dark:text-white text-black">
          More
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
