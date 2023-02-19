import { FC } from "react";
import { Layout } from "../../types";
import Sidebar from "../Sidebar";

const MainLayout: FC<Layout> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className={`flex items-center justify-center w-full`}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
