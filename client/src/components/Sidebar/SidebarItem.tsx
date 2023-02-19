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
      className={`flex items-center w-full p-3 rounded-full hover:bg-gray-100 ${
        sidebar.href === location.pathname && "bg-gray-100"
      } mb-2 transition-colors cursor-pointer last:mb-0`}
    >
      <sidebar.icons />
      <span className="lg:block hidden text-[16px] text-black ml-4">
        {sidebar.title}
      </span>
    </Link>
  );
};

export default SidebarItem;
