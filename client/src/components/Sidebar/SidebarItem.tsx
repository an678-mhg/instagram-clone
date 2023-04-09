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
      className={`flex md:justify-start justify-center items-center w-full text-white p-3 md:rounded-full hover:bg-[#222] ${
        sidebar.href === location.pathname && "bg-[#222]"
      } md:mb-2 transition-colors cursor-pointer last:mb-0`}
    >
      <sidebar.icons className="text-white" />
      <span className="lg:block hidden text-[16px] text-white ml-4">
        {sidebar.title}
      </span>
    </Link>
  );
};

export default SidebarItem;
