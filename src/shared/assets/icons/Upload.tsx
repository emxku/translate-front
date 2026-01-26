import React from "react";

interface UploadProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Upload: React.FC<UploadProps> = ({ className = "", width = 36, height = 36 }) => {
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
        d="M23.8182 20V22.25H26V23.75H23.8182V26H22.3636V23.75H20.1818V22.25H22.3636V20H23.8182ZM23.8241 11C24.2225 11 24.5455 11.3337 24.5455 11.7451L24.546 18.7563C24.0908 18.5903 23.6011 18.5 23.0909 18.5V12.5H11.4545L11.4553 23L18.213 16.0304C18.4748 15.7595 18.8873 15.7387 19.1726 15.9674L19.2411 16.0308L21.8197 18.694C20.0298 19.2552 18.7273 20.9707 18.7273 23C18.7273 23.5261 18.8148 24.0312 18.9758 24.5005L10.7213 24.5C10.3229 24.5 10 24.1663 10 23.7549V11.7451C10 11.3336 10.3311 11 10.7213 11H23.8241ZM14.3636 14C15.167 14 15.8182 14.6716 15.8182 15.5C15.8182 16.3285 15.167 17 14.3636 17C13.5603 17 12.9091 16.3285 12.9091 15.5C12.9091 14.6716 13.5603 14 14.3636 14Z"
        fill="white"
      />
    </svg>
  );
};
