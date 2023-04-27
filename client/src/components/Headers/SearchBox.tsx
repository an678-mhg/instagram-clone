import Search from "../../icons/Search";
import Tippy from "@tippyjs/react/headless";
import { CircularProgress } from "react-cssfx-loading";
import SearchAccountItem from "./SearchAccountItem";
import useSearchUsers from "../../hooks/useSearchUsers";

const SearchBox = () => {
  const {
    handleOnChangeInput,
    loading,
    searchResults,
    searchText,
    showSearchBox,
    setShowBox,
  } = useSearchUsers();

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
