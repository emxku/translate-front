import React, { createContext, useContext, useMemo, useState } from "react";
import type { Translation } from "@/features/bookList/model/types";

  /* Вот эту штуку потом надо на бэк менять */
const initialTranslations: Translation[] = [
  {
    id: 1,
    title: "Портрет Дориана Грея",
    description: "Вы остановились на 1 главе",
    currentChapter: 1,
    chapters: [
      { id: 101, title: "Глава 1", order: 1},
      { id: 102, title: "Глава 2", order: 2},
      { id: 103, title: "Глава 3", order: 3}
    ]
  },
  {
    id: 2,
    title: "Денс, денс, денс",
    description: "Вы остановились на 1 главе ",
    currentChapter: 1,
    chapters: [
      { id: 201, title: "Глава 1", order: 1 },
      { id: 202, title: "Глава 2", order: 2 }
    ]
  },
  {
    id: 3,
    title: "Пикник у обочины",
    description: "Вы остановились на 1 главе ",
    currentChapter: 1,
    chapters: [{ id: 301, title: "Глава 1", order: 1}]
  }
];

type TranslationsContextValue = {
  translations: Translation[];
  isCreateModalOpen: boolean;
  editingTranslation: Translation | null;

  handleCardClick: (id: number) => void;// пока пусть будет, потом заменить
  handleCardEdit: (id: number) => void;
  handleSaveEdit: (newTitle: string) => void;
  handleCloseEditModal: () => void;

  handleCreateNew: () => void;
  handleCreateTranslation: (title: string) => void;
  handleCloseCreateModal: () => void;

  handleCloseModal: () => void;
};

const TranslationsContext = createContext<TranslationsContextValue | null>(null);

export const TranslationsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [translations, setTranslations] = useState<Translation[]>(initialTranslations);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTranslation, setEditingTranslation] = useState<Translation | null>(null);

  const handleCardClick = (id: number) => {
    //навигация в BookList, тут заглушка
    console.log("card click", id);
  };

  const handleCardEdit = (id: number) => {
    const tranlsationToEdit = translations.find((t) => t.id === id);
    if (tranlsationToEdit) {
      setEditingTranslation(tranlsationToEdit);
    }
  };

  const handleSaveEdit = (newTitle: string) => {
    if (!editingTranslation) return;

    setTranslations((prev) =>
    prev.map((translation) =>
      translation.id === editingTranslation.id ? {...translation, title:newTitle} : translation
    )
  );
  setEditingTranslation(null);
  };

  const handleCloseEditModal = () => {
    setEditingTranslation(null);
  };

  const handleCreateNew = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateTranslation = (title: string) => {
    const newTranslation: Translation = {
      id: Date.now(), // временный адишник, потом тут бэк будет
      title,
      description: "Вы остановились на 1 главе",
      currentChapter: 1,
      chapters: []
    };

    setTranslations((prev) => [...prev, newTranslation]);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  const value = useMemo<TranslationsContextValue>(
    () => ({
      translations,
      isCreateModalOpen,
      editingTranslation,
      handleCardClick,
      handleCardEdit,
      handleSaveEdit,
      handleCloseEditModal,
      handleCreateNew,
      handleCreateTranslation,
      handleCloseCreateModal,
      handleCloseModal
    }),
    [translations, isCreateModalOpen, editingTranslation]
  );

  return <TranslationsContext.Provider value={value}>{ children }</TranslationsContext.Provider>;
};

export const useTranslationsContext = () => {
  const ctx = useContext(TranslationsContext);
  if (!ctx) {
    throw new Error("useTranslationsContext muse be used within TranslationsProvide");
  }
  return ctx;
};