import { FC } from "react";
import { Layout } from "../../types";
import Sidebar from "../Sidebar";

const MainLayout: FC<Layout> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div
        className={`flex items-center justify-center w-full flex-1 lg:ml-[245px] md:ml-[72px] ml-0`}
      >
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
