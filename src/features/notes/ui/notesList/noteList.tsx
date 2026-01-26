import React from "react";
import cls from "./noteList.module.scss";
import type { NotesListProps } from "../../model/types";
import { Notte } from "../note/note";
import { AddNoteButton } from "../addNoteButton/addNoteButton";

export const NotesList: React.FC<NotesListProps> = ({ notes, onNoteEdit, onNoteDelete, onNoteAdd }) => {
  return (
    <div className={cls.notesList}>
      <h2 className={cls.sectionTitle}>Заметки</h2>
      <div className={cls.notesContainer}>
        {notes.map((note) => (
          <Notte key={note.id} note={note} onEdit={onNoteEdit} onDelete={onNoteDelete} />
        ))}

        <AddNoteButton onAdd={onNoteAdd} />
      </div>
    </div>
  );
};
