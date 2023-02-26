import { LazyLoadImage } from "react-lazy-load-image-component";

const AccountItem = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 last:mb-0">
      <div className="flex items-center">
        <LazyLoadImage
          effect="blur"
          className="w-[42px] h-[42px] rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ZvHdn0DadjQB9oXbn9XXKvRdGQP6BSFJzw&usqp=CAU"
        />
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-black">nguyenan763</h3>
          <p className="text-sm font-normal text-gray-400">An Nguyen</p>
        </div>
      </div>
      <button className="p-2 text-blue-500 font-semibold text-sm">
        Follow
      </button>
    </div>
  );
};

export default AccountItem;
