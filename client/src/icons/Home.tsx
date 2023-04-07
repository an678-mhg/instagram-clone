import { FC } from "react";
import { IconProps } from "../types";

const Home: FC<IconProps> = ({ className, color }) => {
  return (
    <div className={className}>
      <svg
        aria-label="Home"
        className="_ab6-"
        color={color}
        fill={color}
        height={24}
        role="img"
        viewBox="0 0 24 24"
        width={24}
      >
        <path
          d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    </div>
  );
};

export default Home;
