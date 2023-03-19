import { LazyLoadImage } from "react-lazy-load-image-component";
import Comment from "../../assets/icons/Comment";
// import Like from "../../assets/icons/Like";
import Menu from "../../assets/icons/Menu";
import Message from "../../assets/icons/Message";
import Notification from "../../assets/icons/Notification";
import Save from "../../assets/icons/Save";
import { Post } from "../../types/posts";
import calculateCreatedTime from "../../utils/formatDate";
import ImageSlide from "../ImageSlide";

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div className="mb-5 last:mb-0 md:px-0 px-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <LazyLoadImage
            effect="blur"
            className="w-[42px] h-[42px] rounded-full"
            src={post.user?.avatar}
          />
          <h3 className="text-sm font-semibold ml-3 text-black">
            {post.user?.username}{" "}
            <span className="text-gray-400">
              • {calculateCreatedTime(post.createdAt)}
            </span>
          </h3>
        </div>
        <Menu className="text-black" />
      </div>
      <div className="mt-3">
        <ImageSlide radius media={post.media} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Notification />
          <Comment className="text-black" />
          <Message className="text-black" />
        </div>
        <Save className="text-black" />
      </div>
      <div className="my-2">
        <p className="text-sm font-semibold text-black">
          {post.like_count} likes
        </p>
        <p className="text-sm font-semibold text-black">
          {post.comment_count} comments
        </p>
      </div>
      <div className="border-b border-gray-200 pb-4">
        <p className="text-sm font-normal text-black">{post.caption}</p>
      </div>
    </div>
  );
};

export default PostItem;
