import Tippy from "@tippyjs/react/headless";
import EmojiPicker from "emoji-picker-react";
import React from "react";
import { BsEmojiSmile } from "react-icons/bs";

interface EmojiTippyProps {
  showSelectEmoji: boolean;
  setShowSelectEmoji: () => void;
  typingEmoji: (emoji: string) => void;
}

const EmojiTippy: React.FC<EmojiTippyProps> = ({
  setShowSelectEmoji,
  showSelectEmoji,
  typingEmoji,
}) => {
  return (
    <Tippy
      content="emoji"
      interactive
      onClickOutside={() => setShowSelectEmoji()}
      visible={showSelectEmoji}
      render={(attrs) => (
        <div {...attrs}>
          <EmojiPicker
            emojiVersion="1.0"
            onEmojiClick={(emoji) => typingEmoji(emoji.emoji)}
          />
        </div>
      )}
      placement="auto-start"
    >
      <div className="cursor-pointer">
        <BsEmojiSmile
          onClick={(e) => {
            e.stopPropagation();
            setShowSelectEmoji();
          }}
        />
      </div>
    </Tippy>
  );
};

export default React.memo(EmojiTippy);
