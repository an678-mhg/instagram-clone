import Menu from "../../icons/Menu";

const PostSkeleton = () => {
  return (
    <div className="mb-5 last:mb-0 md:px-0 px-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-[42px] h-[42px] rounded-full skeleton" />
          <h3 className="text-sm font-semibold ml-3 text-white skeleton h-3 w-[100px]" />
        </div>
        <Menu className="text-white" />
      </div>
      <div className="mt-3">
        <div className="w-full aspect-square rounded-md skeleton"></div>
      </div>
      <div className="border-b border-[#262626] pb-4 space-y-2 mt-3">
        <p className="text-sm font-normal text-white skeleton w-full h-3 rounded-md" />
        <p className="text-sm font-normal text-white skeleton w-full h-3 rounded-md" />
        <p className="text-sm font-normal text-white skeleton w-[80%] h-3 rounded-md" />
      </div>
    </div>
  );
};

export default PostSkeleton;
