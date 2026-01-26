import { NotesList, useNotes } from "@/features/notes";

export const Notes = () => {
  const { notes, handleAddNote, handleEditNote, handleDeleteNote } = useNotes();

  return (
    <NotesList notes={notes} onNoteEdit={handleEditNote} onNoteDelete={handleDeleteNote} onNoteAdd={handleAddNote} />
  );
};
