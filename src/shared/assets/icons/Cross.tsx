import React from "react";

interface CrossProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}
export const Cross: React.FC<CrossProps> = ({ className = "", width = 25, height = 25 }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="16.97" y="4.94983" width="3" height="17" rx="1.5" transform="rotate(45 16.97 4.94983)" fill="#3E73E4" />
      <rect
        x="19.0911"
        y="16.9706"
        width="3"
        height="17"
        rx="1.5"
        transform="rotate(135 19.0911 16.9706)"
        fill="#3E73E4"
      />
    </svg>
  );
};
