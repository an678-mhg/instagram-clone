import { InfiniteData, useMutation, useQueryClient } from "react-query";
import Comment from "../../icons/Comment";
import Like from "../../icons/Like";
import Menu from "../../icons/Menu";
import Message from "../../icons/Message";
import Notification from "../../icons/Notification";
import { likePost, removePost } from "../../services/posts";
import { HomeFeed, Post } from "../../types/posts";
import calculateCreatedTime from "../../utils/formatDate";
import ImageSlide from "../ImageSlide";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { postKey } from "../../utils/react-query-key";
import { Link } from "react-router-dom";
import { parseLinkDescription } from "../../utils/contants";
import Tippy from "@tippyjs/react/headless";
import { FiEdit2 } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { CircularProgress } from "react-cssfx-loading";
import { CreatePostModalContext } from "../../context/CreatePostModalContext";
import { createNotification } from "../../services/notifications";
import { SocketContext } from "../../context/SocketContext";
import ImageFade from "../ImageFade";

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
  const { socketRef } = useContext(SocketContext);
  const { setIsOpen, setPost, setAction } = useContext(CreatePostModalContext);

  const [showMenu, setShowMenu] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation(likePost, {
    onError: (error: any) => {
      toast.error(error?.response?.data || "Something went wrong!");
    },
    onSuccess: async (response: any) => {
      if (user?._id === post.user._id || response?.action === "unlike") return;

      const notification = await createNotification({
        comment: null,
        post: post._id,
        message: "just liked your post",
        url: `/post/${post._id}`,
        user: [post.user?._id],
      });

      socketRef.current?.emit("create-new-notification", notification);
    },
  });

  const { mutateAsync: removePostAsync, isLoading } = useMutation(removePost, {
    onSuccess: () => {
      const newData = queryClient.getQueryData([
        postKey.GET_HOME_FEED,
      ]) as InfiniteData<HomeFeed>;

      const pageCurrent = Math.floor(index / limit);

      newData.pages[pageCurrent].posts = newData.pages[
        pageCurrent
      ].posts.filter((item) => item._id !== post._id);

      queryClient.setQueryData([postKey.GET_HOME_FEED], newData);
      queryClient.refetchQueries([postKey.GET_HOME_FEED]);
    },
  });

  const handleLikePost = () => {
    if (isError) return;

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

  const handleRemovePost = () => {
    const isDelete = window.confirm("Are you sure remove post!");
    if (!isDelete) return setShowMenu(false);
    removePostAsync(post._id);
  };

  const handleOpenModalEdit = () => {
    setAction("update");
    setPost(post);
    setIsOpen(true);
  };

  return (
    <div className="mb-5 last:mb-0 md:px-0 px-2">
      <div className="flex items-center justify-between">
        <Link to={`/profile/${post.user._id}`} className="flex items-center">
          <ImageFade
            loading="lazy"
            className="w-[42px] h-[42px] rounded-full"
            src={post.user?.avatar}
          />

          <h3 className="text-sm font-semibold ml-3 text-white">
            {post.user?.username}{" "}
            <span className="text-gray-400">
              • {calculateCreatedTime(post.createdAt)}
            </span>
          </h3>
        </Link>
        {user?._id === post?.user?._id && (
          <Tippy
            visible={showMenu}
            interactive
            placement="bottom-start"
            onClickOutside={() => setShowMenu(false)}
            render={(attrs) => (
              <div {...attrs}>
                <div className="bg-black shadow-lg rounded-md">
                  <button
                    disabled={isLoading}
                    onClick={handleOpenModalEdit}
                    className="cursor-pointer px-4 py-2 border-b border-[#262626] text-sm font-normal flex items-center space-x-4"
                  >
                    <FiEdit2 size={15} />
                    <span>Edit post</span>
                  </button>
                  <button
                    disabled={isLoading}
                    onClick={handleRemovePost}
                    className="cursor-pointer px-4 py-2 border-b border-[#262626] text-sm font-normal flex items-center space-x-4"
                  >
                    {!isLoading ? (
                      <BsTrash size={15} />
                    ) : (
                      <CircularProgress color="#fff" width={16} height={16} />
                    )}
                    <span>Remove post</span>
                  </button>
                </div>
              </div>
            )}
          >
            <div
              className="cursor-pointer"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <Menu className="text-white" />
            </div>
          </Tippy>
        )}
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
            <Comment className="text-white" />
          </Link>
          <Message className="text-white" />
        </div>
      </div>
      <div className="my-2">
        <p className="text-sm font-semibold text-white">
          {post.like_count} likes
        </p>
        <p className="text-sm font-semibold text-white">
          {post.comment_count} comments
        </p>
      </div>
      <div className="border-b border-[#262626] pb-4">
        <p
          dangerouslySetInnerHTML={{
            __html: parseLinkDescription(post?.caption),
          }}
          className="text-sm font-normal text-white line-clamp-2"
        />
      </div>
    </div>
  );
};

export default PostItem;
