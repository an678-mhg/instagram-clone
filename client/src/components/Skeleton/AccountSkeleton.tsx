const AccountSkeleton = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 last:mb-0">
      <div className="flex items-center">
        <div className="w-[35px] h-[35px] rounded-full skeleton" />
        <div className="ml-3 space-y-2">
          <h3 className="text-sm font-semibold text-white skeleton w-[100px] h-3 rounded-md"></h3>
          <h3 className="text-sm font-semibold text-white skeleton w-[80px] h-3 rounded-md"></h3>
        </div>
      </div>
      <button className="w-[80px] h-5 skeleton rounded-md"></button>
    </div>
  );
};

export default AccountSkeleton;
