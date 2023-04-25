import YourMessages from "../../../icons/YourMessages";

const NoChat = () => {
  return (
    <div className="flex-1 flex items-center flex-col justify-center">
      <YourMessages />
      <h6 className="text-xl mt-3">Your Messages</h6>
      <p className="text-sm mt-2 text-gray-500">
        Send private photos and messages to a friend or group.
      </p>
      <button className="mt-4 py-2 px-4 rounded-md text-sm font-semibold bg-blue-500">
        Send messaages
      </button>
    </div>
  );
};

export default NoChat;
