import React from "react";
import cls from "./addNoteButton.module.scss";
import { Plus } from "@/shared/assets/icons/Plus";

interface AddNoteButtonProps {
  onAdd: () => void;
}

export const AddNoteButton: React.FC<AddNoteButtonProps> = ({ onAdd }) => {
  return (
    <div className={cls.addNoteButton} onClick={onAdd}>
      <Plus />
    </div>
  );
};
