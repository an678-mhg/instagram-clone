import Comment from "../../assets/icons/Comment";
import Notification from "../../assets/icons/Notification";
import { Post } from "../../types/posts";

interface PostExploreProps {
  post: Post;
}

const PostExplore: React.FC<PostExploreProps> = ({ post }) => {
  return (
    <div className="aspect-square relative cursor-pointer post-explore">
      <img
        src={post.media[0]}
        loading="lazy"
        className="object-cover w-full h-full"
      />
      <div className="absolute post-explore-overlay inset-0 bg-[#0000006c] flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Notification color="#fff" />
            <p className="text-white">{post.like_count}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Comment className="text-white" />
            <p className="text-white">{post.comment_count}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostExplore;