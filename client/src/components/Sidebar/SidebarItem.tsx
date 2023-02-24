import { FC } from "react";
import { Sidebar } from "../../types";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  sidebar: Sidebar;
}

const SidebarItem: FC<SidebarItemProps> = ({ sidebar }) => {
  const location = useLocation();

  return (
    <Link
      to={sidebar.href}
      className={`flex md:justify-start justify-center items-center w-full hover:dark:bg-[#222] dark:text-white text-black p-3 rounded-full hover:bg-gray-100 ${
        sidebar.href === location.pathname && "bg-gray-100 dark:bg-[#222]"
      } md:mb-2 transition-colors cursor-pointer last:mb-0`}
    >
      <sidebar.icons className="dark:text-white text-black" />
      <span className="lg:block hidden text-[16px] text-black dark:text-white ml-4">
        {sidebar.title}
      </span>
    </Link>
  );
};

export default SidebarItem;
