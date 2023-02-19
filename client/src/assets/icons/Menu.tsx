import { FC } from "react";
import { IconProps } from "../../types";

const Menu: FC<IconProps> = ({ className, color }) => {
  return (
    <div className={className}>
      <svg
        aria-label="More options"
        className="_ab6-"
        color={color}
        fill={color}
        height={24}
        role="img"
        viewBox="0 0 24 24"
        width={24}
      >
        <circle cx={12} cy={12} r="1.5" />
        <circle cx={6} cy={12} r="1.5" />
        <circle cx={18} cy={12} r="1.5" />
      </svg>
    </div>
  );
};

export default Menu;
