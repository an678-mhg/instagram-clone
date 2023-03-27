import Menu from "../../assets/icons/Menu";

const PostDetailSkeleton = () => {
  return (
    <div className="md:h-screen flex md:flex-row flex-col">
      <div className="md:w-[50%] w-full object-contain md:h-full skeleton">
        {" "}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex items-center w-full border-b border-gray-200">
          <div className="w-[40px] h-[40px] rounded-full skeleton" />
          <div className="ml-3 flex items-center justify-between flex-1">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold h-3 w-[100px] skeleton rounded-md"></h3>
              <p className="text-sm h-3 w-[80px] skeleton rounded-md"></p>
            </div>
            <Menu />
          </div>
        </div>
        <div className="md:flex-1 h-[300px] p-4"></div>
        <div className="border-t border-gray-200 px-4 pt-4 pb-[60px] space-y-4">
          <p className="text-sm h-3 w-[200px] skeleton rounded-md"></p>
          <p className="text-sm h-3 w-[200px] skeleton rounded-md"></p>
          <p className="text-sm h-3 w-[150px] skeleton rounded-md"></p>
        </div>
      </div>
    </div>
  );
};

export default PostDetailSkeleton;
