const ProfileSkeleton = () => {
  return (
    <div className="xl:w-[950px] w-full mt-8">
      <div className="w-full border-b border-gray-200 pb-8">
        <div className="flex md:space-x-16 space-x-4 md:ml-16 ml-4">
          <div className="w-[150px] h-[150px] rounded-full skeleton" />
          <div>
            <div className="flex space-x-4 items-center">
              <h3 className="font-semibold text-xl w-[100px] h-5 skeleton rounded-md"></h3>
            </div>
            <div className="flex items-center space-x-10 mt-3">
              <p className="font-semibold skeleton w-[80px] h-4 rounded-md"></p>
              <p className="font-semibold skeleton w-[80px] h-4 rounded-md"></p>
              <p className="font-semibold skeleton w-[80px] h-4 rounded-md"></p>
            </div>
            <h4 className="font-semibold mt-4 w-[100px] h-4 rounded-md skeleton"></h4>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-1 mt-5">
        {Array.from(Array(6).keys()).map((item) => (
          <div className="w-full aspect-square skeleton" key={item} />
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;