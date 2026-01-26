import React, { useState } from "react";
import cls from "./createTranslationModal.module.scss";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Cross } from "@/shared/assets/icons/Cross";

interface CreateTranslationModalProps {
  isOpen: boolean;
  onCreate: (title: string) => void;
  onClose: () => void;
}

export const CreateTranslationModal: React.FC<CreateTranslationModalProps> = ({ isOpen, onCreate, onClose }) => {
  const [newTitle, setNewTitle] = useState("");

  React.useEffect(() => {
    if (isOpen) {
      setNewTitle("");
    }
  }, [isOpen]);

  const handleCreate = () => {
    if (newTitle.trim()) {
      onCreate(newTitle.trim());
      onClose();
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
          <h2 className={cls.modalTitle}>Добавить перевод</h2>
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
          <Button theme="regular" onClick={handleCreate} className={cls.saveButton}>
            Добавить
          </Button>
        </div>
      </div>
    </div>
  );
};
