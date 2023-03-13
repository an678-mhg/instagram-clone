import { LazyLoadImage } from "react-lazy-load-image-component";
import Comment from "../../assets/icons/Comment";
import Menu from "../../assets/icons/Menu";
import Message from "../../assets/icons/Message";
import Notification from "../../assets/icons/Notification";
import Save from "../../assets/icons/Save";
import ImageSlide from "../ImageSlide";

const media = [
  "https://images.unsplash.com/photo-1676739210571-0f3dc022c3d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1676735296710-758d95e3044f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1676798665374-96270c5655f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
  "https://plus.unsplash.com/premium_photo-1661512469330-822bbfbd6a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://res.cloudinary.com/annnn/video/upload/v1676561561/lc3lxaxfic4v2gbdmxyc.jpg",
];

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
          <h3 className="text-sm font-semibold ml-3 text-black">
            nguyenan763 <span className="text-gray-400">• 8h</span>
          </h3>
        </div>
        <Menu className="text-black" />
      </div>
      {/* Post Main Image */}
      <div className="mt-3">
        <ImageSlide radius media={media} />
      </div>
      {/* Post Reaction & Bookmark */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Notification className="text-black" />
          <Comment className="text-black" />
          <Message className="text-black" />
        </div>
        <Save className="text-black" />
      </div>
      {/* Post Like Count */}
      <div className="my-2">
        <p className="text-sm font-semibold text-black">10 likes</p>
        <p className="text-sm font-semibold text-black">5 comments</p>
      </div>
      {/* Post Caption */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-sm font-normal text-black">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy
        </p>
      </div>
    </div>
  );
};

export default PostItem;
