import { FC } from "react";
import { Layout } from "../../types";
import Headers from "../Headers";
import Sidebar from "../Sidebar";

const MainLayout: FC<Layout> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div
        className={`flex flex-col pb-8 md:pb-0 items-center justify-center w-full flex-1 lg:ml-[245px] md:ml-[72px] ml-0`}
      >
        <Headers />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
