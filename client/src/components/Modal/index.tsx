import { Layout } from "../../types";

interface Modal extends Layout {
  handleClose: () => void;
}

const Modal = ({ children, handleClose }: Modal) => {
  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-[#000000a1] flex items-center justify-center z-[9999]  animation-fade"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="md:p-6 md:w-auto md:h-auto w-full h-full flex items-center justify-center"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
