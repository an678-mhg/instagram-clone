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
      className={`md:p-3 p-1 transition-all lg:w-[245px] w-auto flex flex-col justify-between border-r border-gray-200 h-screen fixed md:top-0 bottom-0 left-0`}
    >
      <div>
        <div>
          <Logo className="py-6 px-3 mb-4 lg:block hidden" color="black" />
          <LogoImage className="py-6 px-3 mb-4 lg:hidden block" color="black" />
        </div>
        <div>
          {sidebars?.map((sidebar) => (
            <SidebarItem key={sidebar.href} sidebar={sidebar} />
          ))}
          <Link
            to="/profile"
            className="flex items-center w-full p-3 rounded-full hover:bg-gray-100 mb-2 transition-colors cursor-pointer last:mb-0"
          >
            <LazyLoadImage
              className="w-6 h-6 rounded-full"
              alt="Profile"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ZvHdn0DadjQB9oXbn9XXKvRdGQP6BSFJzw&usqp=CAU"
            />
            <span className="lg:block hidden text-[16px] text-black ml-4">
              Profile
            </span>
          </Link>
        </div>
      </div>
      <div className="flex items-center p-3 rounded-full hover:bg-gray-100 mb-2 transition-colors cursor-pointer last:mb-0">
        <More color="black" />
        <span className="lg:block hidden text-[16px] text-black ml-4">
          More
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
