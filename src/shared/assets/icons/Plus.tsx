import React from "react";

interface PlusProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Plus: React.FC<PlusProps> = ({ className = "", width = 36, height = 36 }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="16.8008" width="2.4" height="36" rx="1.2" fill="#6D9BFF" />
      <rect x="36" y="16.8" width="2.4" height="36" rx="1.2" transform="rotate(90 36 16.8)" fill="#6D9BFF" />
    </svg>
  );
};
