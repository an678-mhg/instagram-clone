import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { BsPencilSquare } from "react-icons/bs";
import Modal from "../../Modal";
import ChatModal from "../../Modal/ChatModal";

const ConvenstionHeader = () => {
  const { user } = useContext(AuthContext);
  const [showChatModal, setShowChatModal] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 border-b border-[#262626]">
      <div />
      <h4 className="font-normal text-sm">{user?.username}</h4>
      <BsPencilSquare
        onClick={() => setShowChatModal(true)}
        className="cursor-pointer"
        size={20}
      />

      {showChatModal && (
        <Modal handleClose={() => setShowChatModal(false)}>
          <ChatModal
            handleClose={() => {
              setShowChatModal(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default ConvenstionHeader;
