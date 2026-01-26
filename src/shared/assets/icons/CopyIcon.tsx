import React from "react";

interface CopyIconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const CopyIcon: React.FC<CopyIconProps> = ({ className = "", width = 10, height = 12 }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 10 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.22214 2.4V0.6C2.22214 0.268632 2.47087 0 2.7777 0H9.44444C9.75128 0 10 0.268632 10 0.6V9C10 9.33138 9.75128 9.6 9.44444 9.6H7.77775V11.3995C7.77775 11.7311 7.52781 12 7.21841 12H0.559262C0.250331 12 0 11.7332 0 11.3995L0.00144444 3.00052C0.00149999 2.66887 0.251469 2.4 0.560795 2.4H2.22214ZM3.33326 2.4H7.77775V8.4H8.88888V1.2H3.33326V2.4Z"
        fill="#C7D8FF"
      />
    </svg>
  );
};
