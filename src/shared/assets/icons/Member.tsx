import React from "react";

interface MemberProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Member: React.FC<MemberProps> = ({ className = "", width = 32, height = 35 }) => {
  return (
      <svg 
      className={className}
      width={width} 
      height={height} 
      viewBox="0 0 32 35" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5 21.8658V25.3133C15.4678 24.9485 14.3571 24.75 13.2 24.75C7.73238 24.75 3.3 29.1824 3.3 34.65H0C0 27.3598 5.90984 21.45 13.2 21.45C14.3395 21.45 15.4453 21.5944 16.5 21.8658ZM13.2 19.8C7.73025 19.8 3.3 15.3698 3.3 9.9C3.3 4.43025 7.73025 0 13.2 0C18.6698 0 23.1 4.43025 23.1 9.9C23.1 15.3698 18.6698 19.8 13.2 19.8ZM13.2 16.5C16.8465 16.5 19.8 13.5465 19.8 9.9C19.8 6.2535 16.8465 3.3 13.2 3.3C9.5535 3.3 6.6 6.2535 6.6 9.9C6.6 13.5465 9.5535 16.5 13.2 16.5ZM23.1 26.4V21.45H26.4V26.4H31.35V29.7H26.4V34.65H23.1V29.7H18.15V26.4H23.1Z" fill="#C7D8FF"/>
      </svg>
  );
};


