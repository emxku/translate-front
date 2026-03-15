import React from "react";

interface EditProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}
export const Edit: React.FC<EditProps> = ({ className = "", width = 14, height = 14 }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.42462 2.87132L10.6066 6.05332L3.18198 13.4779H0V10.2959L7.42462 2.87132ZM8.48528 1.81066L10.0763 0.219668C10.3692 -0.0732225 10.844 -0.0732225 11.1369 0.219668L13.2583 2.34099C13.5512 2.63388 13.5512 3.10876 13.2583 3.40165L11.6672 4.99264L8.48528 1.81066Z"
        fill="#C7D8FF"
      />
    </svg>
  );
};
