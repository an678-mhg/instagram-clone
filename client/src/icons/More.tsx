import { FC } from "react";
import { IconProps } from "../types";

const More: FC<IconProps> = ({ className, color }) => {
  return (
    <div className={className}>
      <svg
        aria-label="Settings"
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
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          x1={3}
          x2={21}
          y1={4}
          y2={4}
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          x1={3}
          x2={21}
          y1={12}
          y2={12}
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          x1={3}
          x2={21}
          y1={20}
          y2={20}
        />
      </svg>
    </div>
  );
};

export default More;
