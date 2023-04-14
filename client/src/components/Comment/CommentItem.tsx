import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Like from "../../icons/Like";
import Notification from "../../icons/Notification";
import {
  deleteComment,
  getComment,
  likeComment,
  replyComment,
} from "../../services/posts";
import { Comment, Post } from "../../types/posts";
import calculateCreatedTime from "../../utils/formatDate";
import { postKey } from "../../utils/react-query-key";
import { useState } from "react";
import FormComment from "./FormComment";
import { CircularProgress } from "react-cssfx-loading";
import { Link } from "react-router-dom";
import { parseLinkDescription } from "../../utils/contants";
import { createNotification } from "../../services/notifications";
import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import { useEffect, useRef } from "react";
import useQueryParams from "../../hooks/useQueryParams";
import { AuthContext } from "../../context/AuthContext";
import ImageFade from "../ImageFade";
import { BsTrash } from "react-icons/bs";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const queryClient = useQueryClient();
  const { socketRef } = useContext(SocketContext);
  const { user } = useContext(AuthContext);

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const queryParams = useQueryParams();
  const commentRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading: mutateReplyCommentLoading } = useQuery(
    [postKey.GET_REPLY_COMMENT(comment._id, showReply)],
    () => {
      if (!showReply) return null;
      return getComment(comment.post, comment._id);
    }
  );

  const { mutateAsync } = useMutation(likeComment, {
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const { mutateAsync: deleteCommentAsync, isLoading: deleteCommentLoading } =
    useMutation(deleteComment, {
      onSuccess: () => {
        const newData = queryClient.getQueryData([
          postKey.GET_DETAIL_POST(comment.post),
        ]) as [Post, Comment[]];

        if (comment.parent_id === null) {
          newData[1] = newData[1].filter((item) => item._id !== comment._id);

          queryClient.setQueryData(
            [postKey.GET_DETAIL_POST(comment.post)],
            newData
          );
        } else {
          queryClient.refetchQueries([
            postKey.GET_REPLY_COMMENT(comment.parent_id, true),
          ]);
        }
      },
    });

  const { mutateAsync: replyCommentAsync, isLoading } = useMutation(
    replyComment,
    {
      onSuccess: async (response) => {
        if (response.success) {
          const newData = queryClient.getQueryData([
            postKey.GET_DETAIL_POST(comment.post),
          ]) as [Post, Comment[]];

          newData[1] = newData[1].map((item) =>
            item._id === comment._id
              ? { ...comment, num_replies: comment.num_replies + 1 }
              : item
          );

          queryClient.setQueryData(
            [postKey.GET_DETAIL_POST(comment.post)],
            newData
          );

          queryClient.refetchQueries([
            postKey.GET_REPLY_COMMENT(comment._id, showReply),
          ]);

          setShowReplyForm((prev) => !prev);

          if (user?._id === comment.user?._id) return;

          const notification = await createNotification({
            comment: comment._id,
            message: "just mentioned you in a comment",
            post: comment.post,
            url: `/post/${comment.post}?comment=${comment._id}`,
            user: [comment.user._id],
          });

          socketRef?.current?.emit("create-new-notification", notification);
        }
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );

  const handleLikeComment = () => {
    const newData = queryClient.getQueryData([
      postKey.GET_DETAIL_POST(comment.post),
    ]) as [Post, Comment[]];

    if (comment.parent_id === null) {
      newData[1] = newData[1].map((item) =>
        item._id === comment._id
          ? {
              ...comment,
              is_liked: !comment.is_liked,
              like_count: comment.is_liked
                ? comment.like_count - 1
                : comment.like_count + 1,
            }
          : item
      );

      queryClient.setQueryData(
        [postKey.GET_DETAIL_POST(comment.post)],
        newData
      );
    } else {
      const key = postKey.GET_REPLY_COMMENT(comment.parent_id, true);
      const newDataReplies = queryClient.getQueryData([key]) as Comment[];

      queryClient.setQueryData(
        [key],
        newDataReplies?.map((item) =>
          item._id === comment._id
            ? {
                ...comment,
                is_liked: !comment.is_liked,
                like_count: comment.is_liked
                  ? comment.like_count - 1
                  : comment.like_count + 1,
              }
            : item
        )
      );
    }

    mutateAsync(comment._id);
  };

  const createReplyComment = (
    e: React.FormEvent<HTMLFormElement>,
    text: string,
    clearText: () => void
  ) => {
    e.preventDefault();
    if (!text.trim()) return;
    replyCommentAsync({
      comment: text,
      parent_id: comment._id,
      post_id: comment.post,
    }).finally(() => clearText());
  };

  const handleDeleteComment = () => {
    const isUserDeleteComment = window.confirm("Are you sure delete comment!");

    if (isUserDeleteComment) {
      deleteCommentAsync(comment._id);
    }
  };

  useEffect(() => {
    const commentIdVisible = queryParams.get("comment");

    if (commentIdVisible) {
      if (comment._id === commentIdVisible) {
        commentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
        setShowReply(true);
      }
    }
  }, [comment?._id]);

  return (
    <div ref={commentRef}>
      <div className="flex space-x-3">
        <Link to={`/profile/${comment.user?._id}`}>
          <ImageFade
            loading="lazy"
            src={comment.user.avatar}
            className="w-8 h-8 rounded-full mt-[5px]"
          />
        </Link>
        <div className="flex-1">
          <h4 className="text-sm">
            <Link
              to={`/profile/${comment.user?._id}`}
              className="font-semibold inline-block"
            >
              {comment.user?.username}
            </Link>{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: parseLinkDescription(comment.comment),
              }}
            />
          </h4>
          <div className="text-[13px] font-semibold text-gray-400 flex items-center space-x-3 mt-1">
            <p>{calculateCreatedTime(comment.createdAt)}</p>
            <p>{comment.like_count} likes</p>
            {!comment.parent_id && (
              <p
                onClick={() => setShowReplyForm((prev) => !prev)}
                className="cursor-pointer"
              >
                {showReplyForm ? "Cancel" : "Reply"}
              </p>
            )}
          </div>
          {comment.num_replies > 0 && (
            <div className="mt-3 flex items-center text-xs text-gray-400 space-x-4">
              <div className="w-[40px] h-[1px] bg-gray-200" />
              <p
                onClick={() => setShowReply((prev) => !prev)}
                className="flex items-center cursor-pointer"
              >
                {showReply
                  ? "Hide replies"
                  : `View ${comment.num_replies} replies`}
                {mutateReplyCommentLoading && (
                  <CircularProgress
                    color="#fff"
                    className="ml-3"
                    width={15}
                    height={15}
                  />
                )}
              </p>
            </div>
          )}
        </div>
        <button
          disabled={deleteCommentLoading}
          onClick={handleLikeComment}
          className="mt-[5px] cursor-pointer"
        >
          {comment.is_liked ? (
            <Like width={16} height={16} />
          ) : (
            <Notification width={16} height={16} />
          )}
        </button>
        {user?._id === comment?.user?._id && (
          <button
            disabled={deleteCommentLoading}
            onClick={handleDeleteComment}
            className="mt-[5px] cursor-pointer"
          >
            {deleteCommentLoading ? (
              <CircularProgress color="#fff" width={16} height={16} />
            ) : (
              <BsTrash width={16} height={16} />
            )}
          </button>
        )}
      </div>

      {showReplyForm && (
        <div className="ml-10 mt-3">
          <FormComment
            handleCreateComment={createReplyComment}
            createCommentLoading={isLoading}
            placeholder={`Reply from ${comment.user?.username}`}
          />
        </div>
      )}

      {showReply && (
        <div className="ml-10 space-y-4 mt-3">
          {data?.map((item) => (
            <CommentItem key={item._id} comment={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
