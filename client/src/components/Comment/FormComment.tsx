import { BsEmojiSmile } from "react-icons/bs";
import { useState } from "react";
import { CircularProgress } from "react-cssfx-loading";

interface FormCommentProps {
  handleCreateComment: (
    e: React.FormEvent<HTMLFormElement>,
    commentText: string,
    clearText: () => void
  ) => void;
  createCommentLoading: boolean;
  placeholder?: string;
}

const FormComment: React.FC<FormCommentProps> = ({
  createCommentLoading,
  handleCreateComment,
  placeholder,
}) => {
  const [comment, setComment] = useState("");

  return (
    <form
      onSubmit={(e) =>
        handleCreateComment(e, comment, () => {
          setComment("");
        })
      }
      className="p-4 flex items-center space-x-4 border-t border-b border-gray-200"
    >
      <BsEmojiSmile />
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={placeholder || "Add a comment..."}
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
  );
};

export default FormComment;
