export interface Note {
  id: number;
  content: string;
}

export interface NoteProps {
  note: Note;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

export interface NotesListProps {
  notes: Note[];
  onNoteEdit: (id: number, content: string) => void;
  onNoteDelete: (id: number) => void;
  onNoteAdd: () => void;
}
