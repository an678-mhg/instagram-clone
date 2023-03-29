import { InfiniteData, useMutation, useQueryClient } from "react-query";
import Comment from "../../assets/icons/Comment";
import Like from "../../assets/icons/Like";
import Menu from "../../assets/icons/Menu";
import Message from "../../assets/icons/Message";
import Notification from "../../assets/icons/Notification";
import Save from "../../assets/icons/Save";
import { likePost } from "../../services/posts";
import { HomeFeed, Post } from "../../types/posts";
import calculateCreatedTime from "../../utils/formatDate";
import ImageSlide from "../ImageSlide";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { postKey } from "../../utils/react-query-key";
import { Link } from "react-router-dom";

interface PostItemProps {
  post: Post;
  isFetching: boolean;
  index: number;
  limit: number;
}

const PostItem: React.FC<PostItemProps> = ({
  post,
  isFetching,
  index,
  limit,
}) => {
  const { user } = useContext(AuthContext);

  const { mutateAsync } = useMutation(likePost, {
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const queryClient = useQueryClient();

  const handleLikePost = () => {
    if (!user) return toast.error("You want login to like post!");

    const oldData = queryClient.getQueryData([
      postKey.GET_HOME_FEED,
    ]) as InfiniteData<HomeFeed>;

    const pageCurrent = Math.floor(index / limit);

    const newData = { ...oldData };

    newData.pages[pageCurrent].posts = newData.pages[pageCurrent].posts?.map(
      (item) =>
        item._id === post._id
          ? {
              ...post,
              is_liked: !post.is_liked,
              like_count: post.is_liked
                ? post.like_count - 1
                : post.like_count + 1,
            }
          : item
    );

    queryClient.setQueryData([postKey.GET_HOME_FEED], newData);

    mutateAsync(post._id);
  };

  return (
    <div className="mb-5 last:mb-0 md:px-0 px-2">
      <div className="flex items-center justify-between">
        <Link to={`/profile/${post.user._id}`} className="flex items-center">
          <img
            loading="lazy"
            className="w-[42px] h-[42px] rounded-full"
            src={post.user?.avatar}
          />

          <h3 className="text-sm font-semibold ml-3 text-black">
            {post.user?.username}{" "}
            <span className="text-gray-400">
              • {calculateCreatedTime(post.createdAt)}
            </span>
          </h3>
        </Link>
        <Menu className="text-black" />
      </div>
      <div className="mt-3">
        <Link to={`/post/${post._id}`}>
          <ImageSlide radius media={post.media} />
        </Link>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button disabled={isFetching} onClick={handleLikePost}>
            {post.is_liked ? <Like /> : <Notification />}
          </button>
          <Link to={`/post/${post._id}`}>
            <Comment className="text-black" />
          </Link>
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
