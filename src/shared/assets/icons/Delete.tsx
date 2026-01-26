import React from "react";

interface DeleteProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Delete: React.FC<DeleteProps> = ({ className = "", width = 19, height = 19 }) => {
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
        d="M13.7596 3.66667H18.3462V5.5H16.5115V17.4167C16.5115 17.9229 16.1009 18.3333 15.5942 18.3333H2.75192C2.24531 18.3333 1.83462 17.9229 1.83462 17.4167V5.5H0V3.66667H4.58654V0.916667C4.58654 0.41041 4.99723 0 5.50385 0H12.8423C13.3489 0 13.7596 0.41041 13.7596 0.916667V3.66667ZM14.6769 5.5H3.66923V16.5H14.6769V5.5ZM6.42115 8.25H8.25577V13.75H6.42115V8.25ZM10.0904 8.25H11.925V13.75H10.0904V8.25ZM6.42115 1.83333V3.66667H11.925V1.83333H6.42115Z"
        fill="#C7D8FF"
      />
    </svg>
  );
};
