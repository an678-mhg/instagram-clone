import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import Like from "../../assets/icons/Like";
import Notification from "../../assets/icons/Notification";
import { likeComment, replyComment } from "../../services/posts";
import { Comment, Post } from "../../types/posts";
import calculateCreatedTime from "../../utils/formatDate";
import { postKey } from "../../utils/react-query-key";
import { useState } from "react";
import FormComment from "./FormComment";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const { mutateAsync } = useMutation(likeComment, {
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const queryClient = useQueryClient();

  const handleLikeComment = () => {
    const newData = queryClient.getQueryData([
      postKey.GET_DETAIL_POST(comment.post),
    ]) as [Post, Comment[]];

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

    queryClient.setQueryData([postKey.GET_DETAIL_POST(comment.post)], newData);

    mutateAsync(comment._id);
  };

  const [showReplyForm, setShowReplyForm] = useState(false);

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
          setShowReplyForm((prev) => !prev);
        }
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );

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
            <p
              onClick={() => setShowReplyForm((prev) => !prev)}
              className="cursor-pointer"
            >
              {showReplyForm ? "Cancel" : "Reply"}
            </p>
          </div>
          {comment.num_replies > 0 && (
            <div className="mt-3 flex items-center text-xs text-gray-400 space-x-4">
              <div className="w-[40px] h-[1px] bg-gray-200" />
              <p>View {comment.num_replies} replies</p>
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
    </>
  );
};

export default CommentItem;
