import NoChat from "../components/Messages/Chat/NoChat";
import Conventions from "../components/Messages/Conventions";

const Messages = () => {
  return (
    <div className="md:p-5 w-full md:h-[calc(100vh-52.8px)] h-[calc(100vh-100.8px)]">
      <div className="w-full mx-auto flex xl:w-[900px] h-full bg-[#111] border border-[#262626]">
        <Conventions />
        <NoChat />
      </div>
    </div>
  );
};

export default Messages;
