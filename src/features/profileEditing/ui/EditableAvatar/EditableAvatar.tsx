import React, { useRef, useState } from "react";
import { Avatar } from "@/shared/ui/Avatar";
import cls from "./EditableAvatar.module.scss";

interface EditableAvatarProps {
  currentAvatar?: string;
  username?: string;
  onAvatarChange?: (file: File) => void;
}

export const EditableAvatar: React.FC<EditableAvatarProps> = ({ currentAvatar, username = "User", onAvatarChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("ВЫБЕРИ ИЗОБРАЖЕНИЕ СЫНОК");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    if (onAvatarChange) {
      onAvatarChange(file);
    }

    event.target.value = "";
  };

  const avatarSrc = previewUrl || currentAvatar;

  return (
    <div className={cls.EditableAvatar}>
      <div className={cls.avatarWrapper} onClick={handleAvatarClick}>
        <Avatar src={avatarSrc} username={username} size="large" />
        <div className={cls.editOverlay}></div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className={cls.fileInput} />
    </div>
  );
};
