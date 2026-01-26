import React from "react";

interface AcceptProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Accept: React.FC<AcceptProps> = ({ className = "", width = 36, height = 36 }) => {
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
      <path d="M15.75 21.1765L25.5 12L27 13.4118L15.75 24L9 17.6471L10.5 16.2353L15.75 21.1765Z" fill="white" />
    </svg>
  );
};
