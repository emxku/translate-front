import { useState } from "react";
import type { Note } from "./types";

const initialNotes: Note[] = [
  {
    id: 1,
    content: "Закончить перевод книги «Портрет Дориана Грея»"
  },
  {
    id: 2,
    content: "Начать перевод книги «Денс, денс, денс»"
  }
];

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  const handleAddNote = () => {
    const newNote: Note = {
      id: Date.now(),
      content: "Новая заметка"
    };
    setNotes((prev) => [...prev, newNote]);
  };

  const handleEditNote = (id: number, newContent: string) => {
    setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, content: newContent } : note)));
  };

  const handleDeleteNote = (id: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return {
    notes,
    handleAddNote,
    handleEditNote,
    handleDeleteNote
  };
};
