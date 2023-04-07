import Search from "../../icons/Search";

const SearchBox = () => {
  return (
    <div className="flex items-center bg-gray-100 w-[360px] flex-1 md:flex-initial mx-4 px-4 rounded-md overflow-hidden">
      <Search className="text-gray-400" width={20} height={20} />
      <input
        placeholder="Search"
        className="bg-transparent flex-1 py-2 text-sm ml-4"
      />
    </div>
  );
};

export default SearchBox;
