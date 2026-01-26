import { useState } from "react";
import type { Translation } from "./types";

{
  /* Вот эту штуку потом надо на бэк менять */
}
const initialTranslations: Translation[] = [
  {
    id: 1,
    title: "Портрет Дориана Грея",
    description: "Вы остановились на 1 главе",
    currentChapter: 1
  },
  {
    id: 2,
    title: "Денс, денс, денс",
    description: "Вы остановились на 1 главе ",
    currentChapter: 1
  },
  {
    id: 3,
    title: "Пикник у обочины",
    description: "Вы остановились на 1 главе ",
    currentChapter: 1
  }
];

export const useTranslations = () => {
  const [translations, setTranslations] = useState<Translation[]>(initialTranslations);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTranslation, setEditingTranslation] = useState<Translation | null>(null);

  const handleCardClick = (id: number) => {
    console.log("Переход в чаптерманагер епта", id);
    {
      /* навигация потом будэээ*/
    }
  };

  const handleCardEdit = (id: number) => {
    const translationToEdit = translations.find((t) => t.id === id);
    if (translationToEdit) {
      setEditingTranslation(translationToEdit);
    }
  };

  const handleSaveEdit = (newTitle: string) => {
    if (editingTranslation) {
      setTranslations((prev) =>
        prev.map((translation) =>
          translation.id === editingTranslation.id ? { ...translation, title: newTitle } : translation
        )
      );
      setEditingTranslation(null);
    }
  };

  const handleCloseEditModal = () => {
    setEditingTranslation(null);
  };
  const handleCreateNew = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateTranslation = (title: string) => {
    const newTranslation: Translation = {
      id: Date.now() /* временный айдишник епта*/,
      title: title,
      description: "Вы остановились на 1 главе",
      currentChapter: 1
    };

    setTranslations((prev) => [...prev, newTranslation]);
    console.log("ПЕРЕХОООД", title);
    /* переход на чаптер манагер */
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  return {
    translations,
    isCreateModalOpen,
    editingTranslation,
    handleCardClick,
    handleCardEdit,
    handleSaveEdit,
    handleCloseEditModal,
    handleCreateNew,
    handleCloseModal,
    handleCreateTranslation,
    handleCloseCreateModal
  };
};
