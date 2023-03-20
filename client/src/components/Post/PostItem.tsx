import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMutation, useQueryClient } from "react-query";
import Comment from "../../assets/icons/Comment";
import Like from "../../assets/icons/Like";
import Menu from "../../assets/icons/Menu";
import Message from "../../assets/icons/Message";
import Notification from "../../assets/icons/Notification";
import Save from "../../assets/icons/Save";
import { likePost } from "../../services/posts";
import { Post } from "../../types/posts";
import calculateCreatedTime from "../../utils/formatDate";
import ImageSlide from "../ImageSlide";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

interface PostItemProps {
  post: Post;
  isFetching: boolean;
}

const PostItem: React.FC<PostItemProps> = ({ post, isFetching }) => {
  const { user } = useContext(AuthContext);
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [liked, setLiked] = useState(post.is_liked);

  const { mutateAsync } = useMutation(likePost, {
    onError: () => {
      setLiked((prev) => !prev);
      toast.error("Something went wrong!");
    },
  });

  const handleLikePost = () => {
    if (!user) return toast.error("You want login to like post!");

    setLiked((prev) => !prev);

    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }

    mutateAsync(post._id);
  };

  useEffect(() => {
    setLiked(post.is_liked);
    setLikeCount(post.like_count);
  }, [post.is_liked, post.like_count]);

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
          <button disabled={isFetching} onClick={handleLikePost}>
            {liked ? <Like /> : <Notification />}
          </button>
          <Comment className="text-black" />
          <Message className="text-black" />
        </div>
        <Save className="text-black" />
      </div>
      <div className="my-2">
        <p className="text-sm font-semibold text-black">{likeCount} likes</p>
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
