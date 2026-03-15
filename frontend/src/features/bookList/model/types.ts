export interface Chapter {
  id: number;
  title: string;
  order: number;
}

export interface Translation {
  id: number;
  title: string;
  description: string;
  currentChapter: number;
  chapters: Chapter[];
}

export interface TranslationCardProps {
  translation: Translation;
  onEdit: (id: number) => void;
  onClick: (id: number) => void;
}

export interface NewCardProps {
  onCreate: () => void;
}

export interface TranslationsGridProps {
  translations: Translation[];
  onCardClick: (id: number) => void;
  onCardEdit: (id: number) => void;
  onCreateNew: () => void;
  editingTranslation: Translation | null;
  onSaveEdit: (newTitle: string) => void;
  onCloseEditModal: () => void;
  isCreateModalOpen: boolean;
  onCreateTranslation: (title: string) => void;
  onCloseCreateModal: () => void;
}
