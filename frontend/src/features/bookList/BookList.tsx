import { TranslationsGrid, useTranslations } from "@/features/bookList";
import { useNavigate } from "react-router-dom";

export const BookList = () => {
  const navigate = useNavigate();

  const {
    translations,
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
      onCardClick={(id) => navigate(`/chaptermanager/${id}`)}
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
