import { LazyLoadImage } from "react-lazy-load-image-component";
import Comment from "../../assets/icons/Comment";
import Emoji from "../../assets/icons/Emoji";
import Menu from "../../assets/icons/Menu";
import Message from "../../assets/icons/Message";
import Notification from "../../assets/icons/Notification";
import Save from "../../assets/icons/Save";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

const PostItem = () => {
  return (
    <div className="mb-5 last:mb-0 md:px-0 px-2">
      {/* Post Headers */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <LazyLoadImage
            effect="blur"
            className="w-[42px] h-[42px] rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ZvHdn0DadjQB9oXbn9XXKvRdGQP6BSFJzw&usqp=CAU"
          />
          <h3 className="text-sm font-semibold ml-3 text-black dark:text-white">
            nguyenan763 <span className="text-gray-400">• 8h</span>
          </h3>
        </div>
        <Menu className="text-black dark:text-white" />
      </div>
      {/* Post Main Image */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={true}
        navigation={true}
      >
        <SwiperSlide>
          <div className="w-full mt-3">
            <LazyLoadImage
              effect="blur"
              className="w-full aspect-square rounded-md"
              src="https://images.unsplash.com/photo-1676739210571-0f3dc022c3d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full mt-3">
            <LazyLoadImage
              effect="blur"
              className="w-full aspect-square rounded-md"
              src="https://images.unsplash.com/photo-1676735296710-758d95e3044f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full mt-3">
            <LazyLoadImage
              effect="blur"
              className="w-full aspect-square rounded-md"
              src="https://images.unsplash.com/photo-1676798665374-96270c5655f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      {/* Post Reaction & Bookmark */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Notification className="text-black dark:text-white" />
          <Comment className="text-black dark:text-white" />
          <Message className="text-black dark:text-white" />
        </div>
        <Save className="text-black dark:text-white" />
      </div>
      {/* Post Like Count */}
      <div className="my-2">
        <p className="text-sm font-semibold text-black dark:text-white">
          10 likes
        </p>
        <p className="text-sm font-semibold text-black dark:text-white">
          5 comments
        </p>
      </div>
      {/* Post Caption */}
      <div>
        <p className="text-sm font-normal text-black dark:text-white">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy
        </p>
      </div>
      {/* Post Comment */}
      <div className="flex items-center border-b border-gray-200 py-1 mt-2">
        <input
          placeholder="Add a comment..."
          className="flex-1 text-sm py-1 text-black dark:text-white bg-transparent outline-none"
        />
        <Emoji className="text-black dark:text-white" />
      </div>
    </div>
  );
};

export default PostItem;
