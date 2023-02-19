import { FC } from "react";
import { IconProps } from "../../types";

const Save: FC<IconProps> = ({ className, color }) => {
  return (
    <div className={className}>
      <svg
        aria-label="Save"
        className="_ab6-"
        color={color}
        fill={color}
        height={24}
        role="img"
        viewBox="0 0 24 24"
        width={24}
      >
        <polygon
          fill="none"
          points="20 21 12 13.44 4 21 4 3 20 3 20 21"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    </div>
  );
};

export default Save;
