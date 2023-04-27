import { MdClose } from "react-icons/md";
import useSearchUsers from "../../hooks/useSearchUsers";
import { CircularProgress } from "react-cssfx-loading";
import SearchAccountItem from "../Headers/SearchAccountItem";

interface ChatModalProps {
  handleClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ handleClose }) => {
  const { handleOnChangeInput, loading, searchResults, searchText } =
    useSearchUsers();

  return (
    <div className="w-[400px] bg-[#111] h-[400px] rounded-md flex-col flex">
      <div className="flex border-[#262626] border-b items-center justify-between py-2 px-4">
        <MdClose
          className="cursor-pointer"
          onClick={handleClose}
          size={25}
          color="#fff"
        />
        <h3 className="text-sm font-normal">New message</h3>
        <button className="text-sm font-semibold text-blue-500">Next</button>
      </div>
      <div className="mt-3 flex flex-col flex-1">
        <div className="relative mx-4">
          <input
            onChange={handleOnChangeInput}
            value={searchText}
            className="w-full text-sm bg-transparent px-4 py-2 border border-[#262626] rounded-md"
            placeholder="Search...."
          />
          {loading && (
            <div className="absolute right-[10px] top-[50%] translate-y-[-50%]">
              <CircularProgress width={16} height={16} color="white" />
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-scroll mt-4">
          <div className="px-4 space-y-4">
            {searchResults?.map((item) => (
              <SearchAccountItem key={item._id} account={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
