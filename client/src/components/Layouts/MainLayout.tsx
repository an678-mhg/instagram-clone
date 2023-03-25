import { FC, useContext } from "react";
import { CreatePostModalContext } from "../../context/CreatePostModalContext";
import { Layout } from "../../types";
import Headers from "../Headers";
import Modal from "../Modal";
import CreatePostModal from "../Modal/CreatePostModal";
import Sidebar from "../Sidebar";

const MainLayout: FC<Layout> = ({ children }) => {
  const { isOpen, setIsOpen } = useContext(CreatePostModalContext);

  return (
    <div className="flex">
      <Sidebar />
      <div
        className={`flex flex-col pb-8 md:pb-0 items-center justify-center w-full flex-1 lg:ml-[245px] md:ml-[72px] ml-0`}
      >
        <Headers />
        {children}
      </div>

      {isOpen && (
        <Modal handleClose={() => setIsOpen(false)}>
          <CreatePostModal />
        </Modal>
      )}
    </div>
  );
};

export default MainLayout;
