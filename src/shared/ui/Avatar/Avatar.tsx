import React from "react";
import cls from "./Avatar.module.scss";
import type { AvatarProps } from "./types";

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Аватар пользователя",
  size = "large",
  username = "User",
  className = ""
}) => {
  const getInitial = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`${cls.avatar} ${cls[size]} ${className}`}>
      {src ? (
        <img src={src} alt={alt} className={cls.avatarImage} />
      ) : (
        <div className={cls.placeholder}>{getInitial(username)}</div>
      )}
    </div>
  );
};
