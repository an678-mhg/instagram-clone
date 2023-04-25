import { useState, useRef, useEffect } from "react";
import Search from "../../icons/Search";
import Tippy from "@tippyjs/react/headless";
import { searchUsers } from "../../services/users";
import { toast } from "react-hot-toast";
import { CircularProgress } from "react-cssfx-loading";
import { User } from "../../types";
import SearchAccountItem from "./SearchAccountItem";
import { useLocation } from "react-router-dom";

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSearchBox, setShowBox] = useState(false);

  const location = useLocation();

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const textValue = e.target.value;
    setSearchText(textValue);

    if (!textValue.trim()) return;

    if (timeoutRef?.current) {
      clearTimeout(timeoutRef?.current);
    }

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchUsers(textValue);
        if (results?.users?.length) {
          setShowBox(true);
          setSearchResults(results?.users);
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setShowBox(false);
  }, [location.pathname]);

  return (
    <Tippy
      onClickOutside={() => setShowBox(false)}
      visible={showSearchBox && searchResults?.length > 0}
      interactive
      render={(attrs) => (
        <div
          {...attrs}
          className="bg-[#333] p-4 rounded-md w-[350px] h-[250px] overflow-y-auto space-y-4"
        >
          {searchResults?.map((account: any) => (
            <SearchAccountItem account={account} key={account._id} />
          ))}
        </div>
      )}
    >
      <div className="flex items-center bg-[#222] w-[360px] flex-1 md:flex-initial mx-4 px-4 rounded-md overflow-hidden">
        <Search className="text-gray-400" width={20} height={20} />
        <input
          onFocus={() => setShowBox(true)}
          value={searchText}
          onChange={handleOnChangeInput}
          placeholder="Search"
          className="bg-transparent flex-1 py-2 text-sm ml-4"
        />
        {loading && <CircularProgress width={16} height={16} color="#fff" />}
      </div>
    </Tippy>
  );
};

export default SearchBox;
