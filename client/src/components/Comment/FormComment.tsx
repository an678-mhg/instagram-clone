import { BsEmojiSmile } from "react-icons/bs";
import { useState, useRef, useCallback } from "react";
import { CircularProgress } from "react-cssfx-loading";
import Tippy from "@tippyjs/react/headless";
import SelectEmoji from "./SelectEmoji";

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

  return (
    <form
      onSubmit={(e) =>
        handleCreateComment(e, comment, () => {
          setComment("");
        })
      }
      className="p-4 flex items-center space-x-4 border-t border-b border-gray-200"
    >
      <Tippy
        interactive
        onClickOutside={() => setShowSelectEmoji(false)}
        visible={showSelectEmoji}
        render={(attrs) =>
          showSelectEmoji && (
            <SelectEmoji typingEmoji={typingEmoji} {...attrs} />
          )
        }
        placement="top-end"
      >
        <div className="cursor-pointer">
          <BsEmojiSmile
            onClick={(e) => {
              e.stopPropagation();
              setShowSelectEmoji((prev) => !prev);
            }}
          />
        </div>
      </Tippy>
      <input
        ref={inputRef}
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
