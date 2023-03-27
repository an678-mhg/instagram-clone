import Notification from "../../assets/icons/Notification";
import { Comment } from "../../types/posts";
import calculateCreatedTime from "../../utils/formatDate";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
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
          <p>26 likes</p>
          <p>Reply</p>
        </div>
        {comment.num_replies > 0 && (
          <div className="mt-3 flex items-center text-xs text-gray-400 space-x-4">
            <div className="w-[40px] h-[1px] bg-gray-200" />
            <p>View {comment.num_replies} replies</p>
          </div>
        )}
      </div>
      <div className="mt-[5px]">
        <Notification width={16} height={16} />
      </div>
    </div>
  );
};

export default CommentItem;
