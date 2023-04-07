import { FC } from "react";
import { IconProps } from "../types";

const Message: FC<IconProps> = ({ className, color }) => {
  return (
    <div className={className}>
      <svg
        aria-label="Direct"
        className="_ab6-"
        color={color}
        fill={color}
        height={24}
        role="img"
        viewBox="0 0 24 24"
        width={24}
      >
        <line
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth={2}
          x1={22}
          x2="9.218"
          y1={3}
          y2="10.083"
        />
        <polygon
          fill="none"
          points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    </div>
  );
};

export default Message;
