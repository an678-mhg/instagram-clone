import { FC } from "react";
import { IconProps } from "../types";

const Comment: FC<IconProps> = ({ className, color }) => {
  return (
    <div className={className}>
      <svg
        aria-label="Comment"
        className="_ab6-"
        color={color}
        fill={color}
        height={24}
        role="img"
        viewBox="0 0 24 24"
        width={24}
      >
        <path
          d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    </div>
  );
};

export default Comment;
