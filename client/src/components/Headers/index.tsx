import { Link } from "react-router-dom";
import Notification from "../../assets/icons/Notification";
import LogoImage from "../../assets/images/LogoImage";
import SearchBox from "./SearchBox";

const Headers = () => {
  return (
    <div className="py-2 sticky top-0 z-[9999] bg-white px-4 border-b border-l border-gray-200 w-full flex items-center justify-between">
      <Link to="/">
        <LogoImage className="md:hidden block" />
      </Link>
      <SearchBox />
      <div className="relative cursor-pointer">
        <Notification />

        <p className="absolute w-[10px] h-[10px] rounded-full bg-red-500 top-[-2px] right-0"></p>
      </div>
    </div>
  );
};

export default Headers;
