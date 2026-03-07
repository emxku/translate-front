import React, {useState} from "react";
import cls from "./ChapterRow.module.scss";
import type { Chapter } from "@/features/bookList/model/types";
import { Edit } from "@/shared/assets/icons/Edit";
import { Save } from "@/shared/assets/icons/Save";
import { Input } from "@/shared/ui/Input/Input";

type ChapterRowProps = {
  chapter: Chapter;
  isSelected: boolean;
  onSelect: () => void;
  onSaveTitle: (newTitle: string) => void;
};

export const ChapterRow: React.FC<ChapterRowProps> = ({
  chapter,
  isSelected,
  onSelect,
  onSaveTitle
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(chapter.title);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };
  
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
  
    if (editedTitle.trim()) {
      onSaveTitle(editedTitle.trim());
    }
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };
  return (
    <div
    className={`${cls.row} ${isSelected ? cls.selected : ""}`}
    onClick={onSelect}
    role="button"
    tabIndex={0}>
      {isEditing ? (
        <div className={cls.editMode}>
          <Input
            value={editedTitle}
            onChange={handleInputChange}
            className={cls.input}
            autoFocus
          />
          <button
            type="button"
            className={cls.actionButton}
            onClick={handleSave}
          >
            <Save/>
          </button>
        </div>
      ) : (
        <div className={cls.viewMode}>
          <span className={cls.title}>{chapter.title}</span>
          <button
            type="button"
            className={cls.actionButton}
            onClick={handleEditClick}
          >
            <Edit/>
          </button>
        </div>
      )}
    </div>
  );
};
