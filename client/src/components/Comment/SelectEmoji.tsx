import { CircularProgress } from "react-cssfx-loading";
import { useQuery } from "react-query";
import { getEmoji } from "../../services/emoji";
import { emojiKey } from "../../utils/react-query-key";
import { useMemo, useState, startTransition, memo } from "react";

interface SelectEmojiProps {
  typingEmoji: (emoiji: string) => void;
}

const SelectEmoji: React.FC<SelectEmojiProps> = ({ typingEmoji }) => {
  const { data, isLoading } = useQuery([emojiKey.GET_EMOJI], getEmoji);
  const [searchText, setSearchText] = useState("");
  const [searchTextQuery, setSearchTextQuery] = useState("");

  const emoiji = useMemo(() => {
    return (
      data &&
      data.filter((item) =>
        searchText.trim()
          ? item.unicodeName.toLowerCase().includes(searchText.toLowerCase())
          : item
      )
    );
  }, [searchTextQuery, data?.length]);

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <input
        className="py-2 px-4 border-b border-gray-200 w-full"
        placeholder="Search..."
        onChange={(e) => {
          startTransition(() => setSearchTextQuery(e.target.value));
          setSearchText(e.target.value);
        }}
      />
      <div className="w-[285px] max-w-full h-[300px] p-2 overflow-y-auto">
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress />
          </div>
        )}
        {emoiji?.map((item) => (
          <span
            onClick={() => typingEmoji(item.character)}
            className="text-xl cursor-pointer inline-block w-[28px]"
            key={item.slug}
            style={{ userSelect: "none" }}
          >
            {item.character}
          </span>
        ))}
      </div>
    </div>
  );
};

export default memo(SelectEmoji);
