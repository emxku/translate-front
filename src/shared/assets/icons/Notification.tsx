import React from "react";

interface NotificationProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Notification: React.FC<NotificationProps> = ({ className = "", width = 36, height = 36 }) => {
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
        d="M26.3337 24.6667H9.66699V23H10.5003V17.1928C10.5003 13.0362 13.8582 9.66666 18.0003 9.66666C22.1425 9.66666 25.5003 13.0362 25.5003 17.1928V23H26.3337V24.6667ZM12.167 23H23.8337V17.1928C23.8337 13.9567 21.222 11.3333 18.0003 11.3333C14.7787 11.3333 12.167 13.9567 12.167 17.1928V23ZM15.917 25.5H20.0837C20.0837 26.6506 19.1509 27.5833 18.0003 27.5833C16.8497 27.5833 15.917 26.6506 15.917 25.5Z"
        fill="white"
      />
    </svg>
  );
};
