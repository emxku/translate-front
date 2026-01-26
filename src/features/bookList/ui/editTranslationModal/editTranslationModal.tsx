import React, { useState } from "react";
import cls from "./editTranslationModal.module.scss";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Cross } from "@/shared/assets/icons/Cross";

interface EditTranslationModalProps {
  isOpen: boolean;
  currentTitle: string;
  onSave: (newTitle: string) => void;
  onClose: () => void;
}

export const EditTranslationModal: React.FC<EditTranslationModalProps> = ({
  isOpen,
  currentTitle,
  onSave,
  onClose
}) => {
  const [newTitle, setNewTitle] = useState(currentTitle);

  React.useEffect(() => {
    if (isOpen) {
      setNewTitle(currentTitle);
    }
  }, [isOpen, currentTitle]);

  const handleSave = () => {
    if (newTitle.trim()) {
      onSave(newTitle.trim());
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className={cls.modalOverlay} onClick={handleOverlayClick}>
      <div className={cls.modal}>
        <button className={cls.closeButton} onClick={onClose}>
          <Cross />
        </button>
        <div className={cls.modalHeader}>
          <h2 className={cls.modalTitle}>Изменить название</h2>
        </div>

        <div className={cls.modalContent}>
          <Input
            value={newTitle}
            onChange={handleInputChange}
            className={cls.titleInput}
            placeholder="Введите название книги"
            autoFocus
          />
        </div>
        <div className={cls.modalFooter}>
          <Button theme="regular" onClick={handleSave} className={cls.saveButton}>
            Изменить
          </Button>
        </div>
      </div>
    </div>
  );
};
