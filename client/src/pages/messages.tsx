import NoChat from "../components/Messages/Chat/NoChat";
import Conventions from "../components/Messages/Conventions";

const Messages = () => {
  return (
    <div className="p-5 w-full h-[calc(100vh-52.8px)]">
      <div className="max-w-full mx-auto flex w-[900px] h-full bg-[#111] border border-[#262626]">
        <Conventions />
        <NoChat />
      </div>
    </div>
  );
};

export default Messages;
