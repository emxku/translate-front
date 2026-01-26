import React, { useState } from "react";
import cls from "./note.module.scss";
import type { NoteProps } from "../../model/types";
import { Input } from "@/shared/ui/Input/Input";
import { Edit } from "@/shared/assets/icons/Edit";
import { Save } from "@/shared/assets/icons/Save";
import { Delete } from "@/shared/assets/icons/Delete";

export const Notte: React.FC<NoteProps> = ({ note, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleSave = () => {
    if (editedContent.trim()) {
      onEdit(note.id, editedContent.trim());
    }
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    onDelete(note.id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContent(e.target.value);
  };

  return (
    <div className={cls.note}>
      {isEditing ? (
        <div className={cls.editMode}>
          <Input value={editedContent} onChange={handleInputChange} className={cls.editInput} autoFocus />
          <button className={cls.saveButton} onClick={handleSave}>
            <Save />
          </button>
        </div>
      ) : (
        <div className={cls.viewMode}>
          <span className={cls.noteContent}>{note.content}</span>
          <div className={cls.noteActions}>
            <button className={cls.editButton} onClick={handleEditClick}>
              <Edit />
            </button>
            <button className={cls.deleteButton} onClick={handleDeleteClick}>
              <Delete />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
