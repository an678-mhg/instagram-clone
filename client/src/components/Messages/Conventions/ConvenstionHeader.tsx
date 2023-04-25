import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { BsPencilSquare } from "react-icons/bs";

const ConvenstionHeader = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-between p-4 border-b border-[#262626]">
      <div />
      <h4 className="font-semibold">{user?.username}</h4>
      <BsPencilSquare className="cursor-pointer" size={20} />
    </div>
  );
};

export default ConvenstionHeader;
