import { ErrorComponent, SidebarInfo, SidebarList } from "@chatify/ui";

import { NotesListItem } from "@/features/notes/components/notes-list/list-item";
import { NotesListLoading } from "@/features/notes/components/notes-list/list-loading";
import { useNotesQuery } from "@/features/notes/hooks/use-notes-query";

export const NotesList = () => {
  const [{ data, fetching, error }] = useNotesQuery();

  if (fetching) {
    return <NotesListLoading />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  if (!data || data.notes.length === 0) {
    return <SidebarInfo>No notes found. Create a new note to get started.</SidebarInfo>;
  }

  return (
    <SidebarList>
      {data.notes.map((note) => (
        <NotesListItem key={note.id} {...note} />
      ))}
    </SidebarList>
  );
};
