import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Like from "../../assets/icons/Like";
import Notification from "../../assets/icons/Notification";
import { getComment, likeComment, replyComment } from "../../services/posts";
import { Comment, Post } from "../../types/posts";
import calculateCreatedTime from "../../utils/formatDate";
import { postKey } from "../../utils/react-query-key";
import { useState } from "react";
import FormComment from "./FormComment";
import { CircularProgress } from "react-cssfx-loading";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const queryClient = useQueryClient();

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

  const { mutateAsync: replyCommentAsync, isLoading } = useMutation(
    replyComment,
    {
      onSuccess: (response) => {
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

  return (
    <>
      <div className="flex space-x-4">
        <img
          src={comment.user.avatar}
          className="w-8 h-8 rounded-full mt-[5px]"
        />
        <div className="flex-1">
          <h4 className="text-sm">
            <span className="font-semibold inline-block">
              {comment.user?.username}
            </span>{" "}
            {comment.comment}
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
                  <CircularProgress className="ml-3" width={15} height={15} />
                )}
              </p>
            </div>
          )}
        </div>
        <div onClick={handleLikeComment} className="mt-[5px]">
          {comment.is_liked ? (
            <Like width={16} height={16} />
          ) : (
            <Notification width={16} height={16} />
          )}
        </div>
      </div>

      {showReplyForm && (
        <div className="ml-10">
          <FormComment
            handleCreateComment={createReplyComment}
            createCommentLoading={isLoading}
            placeholder={`Reply from ${comment.user?.username}`}
          />
        </div>
      )}

      {showReply && (
        <div className="ml-10 space-y-4">
          {data?.map((item) => (
            <CommentItem key={item._id} comment={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default CommentItem;
