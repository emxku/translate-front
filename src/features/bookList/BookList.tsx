import { TranslationsGrid, useTranslations } from "@/features/bookList";

export const BookList = () => {
  const {
    translations,
    handleCardClick,
    handleCardEdit,
    handleCreateNew,
    editingTranslation,
    handleSaveEdit,
    handleCloseEditModal,
    isCreateModalOpen,
    handleCreateTranslation,
    handleCloseCreateModal
  } = useTranslations();

  return (
    <TranslationsGrid
      translations={translations}
      onCardClick={handleCardClick}
      onCardEdit={handleCardEdit}
      onCreateNew={handleCreateNew}
      editingTranslation={editingTranslation}
      onSaveEdit={handleSaveEdit}
      onCloseEditModal={handleCloseEditModal}
      isCreateModalOpen={isCreateModalOpen}
      onCreateTranslation={handleCreateTranslation}
      onCloseCreateModal={handleCloseCreateModal}
    />
  );
};
