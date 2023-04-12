import { useContext, useRef } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import CommentIcons from "../icons/Comment";
import Like from "../icons/Like";
import Notification from "../icons/Notification";
import Save from "../icons/Save";
import LogoImage from "../icons/LogoImage";
import CommentItem from "../components/Comment/CommentItem";
import FormComment from "../components/Comment/FormComment";
import ImageSlide from "../components/ImageSlide";
import PostDetailSkeleton from "../components/Skeleton/PostDetailSkeleton";
import { AuthContext } from "../context/AuthContext";
import {
  createComment,
  getComment,
  getPost,
  likePost,
} from "../services/posts";
import { Comment, Post as PostType } from "../types/posts";
import calculateCreatedTime from "../utils/formatDate";
import { postKey } from "../utils/react-query-key";
import { parseLinkDescription } from "../utils/contants";
import { createNotification } from "../services/notifications";
import { SocketContext } from "../context/SocketContext";
import ImageFade from "../components/ImageFade";

const Post = () => {
  const { _id } = useParams();
  const bottomCommentRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const { socketRef } = useContext(SocketContext);

  const { data, isLoading, isError } = useQuery(
    [postKey.GET_DETAIL_POST(_id as string)],
    () => Promise.all([getPost(_id as string), getComment(_id as string)])
  );

  const { mutateAsync: likePostAsync } = useMutation(likePost, {
    onError: () => {
      toast.error("Something went wrong");
    },
    onSuccess: async (response: any) => {
      if (user?._id === data?.[0]?.user._id || response?.action === "unlike")
        return;

      const notification = await createNotification({
        comment: null,
        post: post._id,
        message: "just liked your post",
        url: `/post/${data?.[0]?._id}`,
        user: [data?.[0]?.user._id as string],
      });

      socketRef.current?.emit("create-new-notification", notification);
    },
  });

  const { mutateAsync, isLoading: createCommentLoading } = useMutation(
    createComment,
    {
      onSuccess: async (response) => {
        const newData = queryClient.getQueryData([
          postKey.GET_DETAIL_POST(_id as string),
        ]) as [PostType, Comment[]];

        const { _id: id, comment, createdAt, updatedAt, post } = response;

        const newComment = {
          _id: id,
          comment,
          createdAt,
          is_liked: false,
          like_count: 0,
          num_replies: 0,
          post,
          updatedAt,
          parent_id: response.parent_id,
          user: {
            _id: user?._id as string,
            avatar: user?.avatar as string,
            fullname: user?.fullname as string,
            is_follow: false,
            username: user?.username as string,
          },
        };

        newData[1].push(newComment);

        queryClient.setQueryData(
          [postKey.GET_DETAIL_POST(_id as string)],
          newData
        );

        bottomCommentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        if (user?._id === data?.[0]?.user?._id) return;

        const notification = await createNotification({
          comment: response._id,
          message: "just commented on your post",
          post: response.post,
          url: `/post/${response.post}?comment=${response._id}`,
          user: [data?.[0]?.user?._id as string],
        });

        socketRef?.current?.emit("create-new-notification", notification);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );

  const handleCreateComment = (
    e: React.FormEvent<HTMLFormElement>,
    comment: string,
    clearText: () => void
  ) => {
    e.preventDefault();
    if (!comment.trim()) return;
    mutateAsync({ post_id: post._id as string, comment }).finally(() =>
      clearText()
    );
  };

  const handleLikePost = () => {
    const newData = queryClient.getQueryData([
      postKey.GET_DETAIL_POST(_id as string),
    ]) as [PostType, Comment[]];

    newData[0].like_count = newData[0].is_liked
      ? newData[0].like_count - 1
      : newData[0].like_count + 1;

    newData[0].is_liked = !newData[0].is_liked;

    queryClient.setQueryData([postKey.GET_DETAIL_POST(_id as string)], newData);

    likePostAsync(_id as string);
  };

  if (isError) {
    return <h1>Failed to load post</h1>;
  }

  if (isLoading || !data) {
    return <PostDetailSkeleton />;
  }

  const [post, comments] = data;

  return (
    <div className="md:h-screen flex md:flex-row flex-col">
      <Link to="/" className="absolute top-0 left-0 z-[9999] p-4">
        <LogoImage />
      </Link>
      <div className="md:w-[50%] w-full object-contain md:h-full">
        <ImageSlide media={post?.media as string[]} />
      </div>
      <div className="flex-1 flex flex-col border-l border-[#262626]">
        <div className="px-4 py-2 flex items-center w-full border-b border-[#262626]">
          <Link to={`/profile/${post?.user?._id}`}>
            <ImageFade
              loading="lazy"
              className="w-[40px] h-[40px] rounded-full"
              src={post?.user?.avatar}
            />
          </Link>
          <div className="ml-3 flex items-center justify-between flex-1">
            <div>
              <Link
                to={`/profile/${post?.user?._id}`}
                className="text-sm font-semibold"
              >
                {post?.user?.username}
              </Link>
              <p className="text-sm">{post?.user?.fullname}</p>
            </div>
          </div>
        </div>
        <div className="md:flex-1 h-[300px] px-4 pt-2 space-y-4 overflow-y-auto">
          <div className="flex space-x-3">
            <ImageFade
              loading="lazy"
              className="w-8 h-8 rounded-full"
              src={post.user?.avatar}
            />
            <div className="flex">
              <h3 className="text-sm font-semibold">
                {post.user?.username}{" "}
                <span
                  className="font-normal"
                  dangerouslySetInnerHTML={{
                    __html: parseLinkDescription(post?.caption),
                  }}
                />
              </h3>
            </div>
          </div>
          {comments?.map((comment) => (
            <CommentItem comment={comment} key={comment._id} />
          ))}
          <div ref={bottomCommentRef}></div>
        </div>
        <div className="border-t border-[#262626] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="cursor-pointer" onClick={handleLikePost}>
                {post?.is_liked ? <Like /> : <Notification />}
              </div>
              <CommentIcons />
            </div>
            <div>
              <Save />
            </div>
          </div>
          <p className="mt-3 text-sm font-semibold">{post?.like_count} likes</p>
          <p className="text-gray-500 text-xs uppercase font-semibold mt-3">
            {calculateCreatedTime(post?.createdAt)}
          </p>
        </div>
        <FormComment
          handleCreateComment={handleCreateComment}
          createCommentLoading={createCommentLoading}
        />
      </div>
    </div>
  );
};

export default Post;
