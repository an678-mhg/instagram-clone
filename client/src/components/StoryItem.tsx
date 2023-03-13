import { LazyLoadImage } from "react-lazy-load-image-component";

const StoryItem = () => {
  return (
    <div className="background rounded-full w-[60px] h-[60px] flex items-center justify-center">
      <LazyLoadImage
        className="rounded-full p-[2px]"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ZvHdn0DadjQB9oXbn9XXKvRdGQP6BSFJzw&usqp=CAU"
      />
    </div>
  );
};

export default StoryItem;
