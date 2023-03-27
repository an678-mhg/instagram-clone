import { useContext, useRef, useState } from "react";
import { CircularProgress } from "react-cssfx-loading";
import { BsEmojiSmile } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import CommentIcons from "../assets/icons/Comment";
import Like from "../assets/icons/Like";
import Menu from "../assets/icons/Menu";
import Message from "../assets/icons/Message";
import Notification from "../assets/icons/Notification";
import Save from "../assets/icons/Save";
import LogoImage from "../assets/images/LogoImage";
import CommentItem from "../components/Comment/CommentItem";
import ImageSlide from "../components/ImageSlide";
import PostDetailSkeleton from "../components/Skeleton/PostDetailSkeleton";
import { AuthContext } from "../context/AuthContext";
import { createComment, getComment, getPost } from "../services/posts";
import { Comment, Post as PostType } from "../types/posts";
import calculateCreatedTime from "../utils/formatDate";
import { postKey } from "../utils/react-query-key";

const Post = () => {
  const { _id } = useParams();

  const { data, isLoading, isError } = useQuery(
    [postKey.GET_DETAIL_POST(_id as string)],
    () => Promise.all([getPost(_id as string), getComment(_id as string)])
  );

  const [comment, setComment] = useState("");

  const bottomCommentRef = useRef<HTMLDivElement | null>(null);

  const queryClient = useQueryClient();

  const { user } = useContext(AuthContext);

  const { mutateAsync, isLoading: createCommentLoading } = useMutation(
    createComment,
    {
      onSuccess: (response) => {
        const newData = queryClient.getQueryData([
          postKey.GET_DETAIL_POST(_id as string),
        ]) as [PostType, Comment[]];

        newData[1].push({
          _id: response.comment._id,
          comment: response.comment.comment,
          createdAt: response.comment.createdAt,
          num_replies: 0,
          updatedAt: response.comment.updatedAt,
          user: {
            _id: user?._id as string,
            avatar: user?.avatar as string,
            fullname: user?.fullname as string,
            is_follow: false,
            username: user?.username as string,
          },
        });

        queryClient.setQueryData(
          [postKey.GET_DETAIL_POST(_id as string)],
          newData
        );

        bottomCommentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      },
      onError: (error) => {},
    }
  );

  const handleCreateComment = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;
    mutateAsync({ post_id: data?.[0]._id as string, comment }).finally(() =>
      setComment("")
    );
  };

  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  return (
    <div className="md:h-screen flex md:flex-row flex-col">
      <Link to="/" className="absolute top-0 left-0 z-[9999] p-4">
        <LogoImage />
      </Link>
      <div className="md:w-[50%] w-full object-contain md:h-full">
        <ImageSlide media={data?.[0]?.media as string[]} />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex items-center w-full border-b border-gray-200">
          <img
            loading="lazy"
            className="w-[40px] h-[40px] rounded-full"
            src={data?.[0]?.user?.avatar}
          />
          <div className="ml-3 flex items-center justify-between flex-1">
            <div>
              <h3 className="text-sm font-semibold">
                {data?.[0]?.user?.username}
              </h3>
              <p className="text-sm">{data?.[0]?.user?.fullname}</p>
            </div>
            <Menu />
          </div>
        </div>
        <div className="md:flex-1 h-[300px] px-4 pt-2 space-y-4 overflow-y-auto">
          {data?.[1].map((comment) => (
            <CommentItem comment={comment} key={comment._id} />
          ))}
          <div ref={bottomCommentRef}></div>
        </div>
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>{data?.[0]?.is_liked ? <Like /> : <Notification />}</div>
              <div>
                <CommentIcons />
              </div>
              <div>
                <Message />
              </div>
            </div>
            <div>
              <Save />
            </div>
          </div>
          <p className="mt-3 text-sm font-semibold">
            {data?.[0]?.like_count} likes
          </p>
          <p className="text-gray-500 text-xs uppercase font-semibold mt-3">
            {calculateCreatedTime(data?.[0]?.createdAt)}
          </p>
        </div>
        <form
          onSubmit={handleCreateComment}
          className="p-4 flex items-center space-x-4 border-t border-gray-200"
        >
          <BsEmojiSmile />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 text-sm"
          />
          <button
            disabled={createCommentLoading}
            className="text-blue-500 font-semibold text-sm"
          >
            {createCommentLoading ? (
              <CircularProgress width={20} height={20} />
            ) : (
              "Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
