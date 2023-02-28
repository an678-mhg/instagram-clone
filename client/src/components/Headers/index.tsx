import Notification from "../../assets/icons/Notification";
import LogoImage from "../../assets/images/LogoImage";
import SearchBox from "./SearchBox";

const Headers = () => {
  return (
    <div className="py-2 sticky top-0 z-[9999] bg-white px-4 border-b border-l border-gray-200 w-full flex items-center justify-between">
      <div>
        <LogoImage className="md:hidden block" />
      </div>
      <SearchBox />
      <div>
        <Notification />
      </div>
    </div>
  );
};

export default Headers;
