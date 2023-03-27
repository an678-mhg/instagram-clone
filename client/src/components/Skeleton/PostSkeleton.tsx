import Menu from "../../assets/icons/Menu";

const PostSkeleton = () => {
  return (
    <div className="mb-5 last:mb-0 md:px-0 px-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-[42px] h-[42px] rounded-full skeleton" />
          <h3 className="text-sm font-semibold ml-3 text-black skeleton h-3 w-[100px]" />
        </div>
        <Menu className="text-black" />
      </div>
      <div className="mt-3">
        <div className="w-full aspect-square rounded-md skeleton"></div>
      </div>
      <div className="border-b border-gray-200 pb-4 space-y-2 mt-3">
        <p className="text-sm font-normal text-black skeleton w-full h-3 rounded-md" />
        <p className="text-sm font-normal text-black skeleton w-full h-3 rounded-md" />
        <p className="text-sm font-normal text-black skeleton w-[80%] h-3 rounded-md" />
      </div>
    </div>
  );
};

export default PostSkeleton;
