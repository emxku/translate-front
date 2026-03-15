import React from "react";
import cls from "./translationsGrud.module.scss";
import type { TranslationsGridProps } from "../../model/types";
import { TranslationCard } from "../translationCard/translationCard";
import { NewCard } from "../newCard/newCard";
import { EditTranslationModal } from "../editTranslationModal/editTranslationModal";
import { CreateTranslationModal } from "../createTranslationModal/createTranslationModal";

export const TranslationsGrid: React.FC<TranslationsGridProps> = ({
  translations,
  onCardClick,
  onCardEdit,
  onCreateNew,
  editingTranslation,
  onSaveEdit,
  onCloseEditModal,
  isCreateModalOpen,
  onCreateTranslation,
  onCloseCreateModal
}) => {
  return (
    <div className={cls.translationsGrid}>
      <h2 className={cls.sectionTitle}>Переводы</h2>
      <div className={cls.cardsContainer}>
        {translations.map((translation) => (
          <TranslationCard key={translation.id} translation={translation} onEdit={onCardEdit} onClick={onCardClick} />
        ))}
        <NewCard onCreate={onCreateNew} />
      </div>
      <EditTranslationModal
        isOpen={!!editingTranslation}
        currentTitle={editingTranslation?.title || ""}
        onSave={onSaveEdit}
        onClose={onCloseEditModal}
      />
      <CreateTranslationModal isOpen={isCreateModalOpen} onCreate={onCreateTranslation} onClose={onCloseCreateModal} />
    </div>
  );
};
