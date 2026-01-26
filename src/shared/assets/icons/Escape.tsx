import React from "react";

interface EscapeProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Escape: React.FC<EscapeProps> = ({ className = "", width = 36, height = 36 }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="35" height="35" rx="17.5" stroke="white" />
      <path
        d="M11.333 23H12.9997V24.6666H22.9997V11.3333H12.9997V13H11.333V10.5C11.333 10.0397 11.7061 9.66663 12.1663 9.66663H23.833C24.2933 9.66663 24.6663 10.0397 24.6663 10.5V25.5C24.6663 25.9602 24.2933 26.3333 23.833 26.3333H12.1663C11.7061 26.3333 11.333 25.9602 11.333 25.5V23ZM12.9997 17.1666H18.833V18.8333H12.9997V21.3333L8.83301 18L12.9997 14.6666V17.1666Z"
        fill="white"
      />
    </svg>
  );
};
