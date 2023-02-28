import { FC } from "react";
import { IconProps } from "../../types";

const Search: FC<IconProps> = ({ className, color, width, height }) => {
  return (
    <div className={className}>
      <svg
        aria-label="Search"
        className="_ab6-"
        color={color}
        fill={color}
        height={height}
        role="img"
        viewBox="0 0 24 24"
        width={width}
      >
        <path
          d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          x1="16.511"
          x2={22}
          y1="16.511"
          y2={22}
        />
      </svg>
    </div>
  );
};

export default Search;
