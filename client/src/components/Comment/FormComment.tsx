import { BsEmojiSmile } from "react-icons/bs";
import { useState, useRef, useCallback } from "react";
import { CircularProgress } from "react-cssfx-loading";
import Tippy from "@tippyjs/react/headless";
import EmojiPicker from "emoji-picker-react";
import EmojiTippy from "./EmojiTippy";

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
  const [showSelectEmoji, setShowSelectEmoji] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const typingEmoji = useCallback((emoji: string) => {
    setComment((prev) => (prev += emoji));
    inputRef.current?.focus();
  }, []);

  const setStatusEmoji = useCallback(() => {
    setShowSelectEmoji((prev) => !prev);
  }, []);

  return (
    <form
      onSubmit={(e) =>
        handleCreateComment(e, comment, () => {
          setComment("");
        })
      }
      className="p-4 flex items-center space-x-4 border-t border-b border-[#262626]"
    >
      <EmojiTippy
        setShowSelectEmoji={setStatusEmoji}
        showSelectEmoji={showSelectEmoji}
        typingEmoji={typingEmoji}
      />
      <input
        ref={inputRef}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={placeholder || "Add a comment..."}
        className="flex-1 text-sm bg-transparent"
      />
      <button
        disabled={createCommentLoading}
        className="text-blue-500 font-semibold text-sm"
      >
        {createCommentLoading ? (
          <CircularProgress color="#fff" width={20} height={20} />
        ) : (
          "Post"
        )}
      </button>
    </form>
  );
};

export default FormComment;
