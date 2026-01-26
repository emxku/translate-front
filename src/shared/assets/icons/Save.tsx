import React from "react";

interface SaveProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Save: React.FC<SaveProps> = ({ className = "", width = 19, height = 19 }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.83462 9.16667C1.83462 5.11658 5.12015 1.83333 9.17308 1.83333C13.226 1.83333 16.5115 5.11658 16.5115 9.16667C16.5115 13.2168 13.226 16.5 9.17308 16.5C5.12015 16.5 1.83462 13.2168 1.83462 9.16667ZM9.17308 0C4.10692 0 0 4.10405 0 9.16667C0 14.2292 4.10692 18.3333 9.17308 18.3333C14.2392 18.3333 18.3462 14.2292 18.3462 9.16667C18.3462 4.10405 14.2392 0 9.17308 0ZM14.1789 6.83568L12.8817 5.53932L8.25577 10.162L5.69383 7.60183L4.39655 8.89818L8.25577 12.7547L14.1789 6.83568Z"
        fill="#C7D8FF"
      />
    </svg>
  );
};
