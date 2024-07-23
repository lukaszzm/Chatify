import { ErrorComponent, SidebarInfo, SidebarList } from "@chatify/ui";

import { NoteSidebarListItem } from "@/features/notes/components/note-sidebar/list-item";
import { NotesListLoading } from "@/features/notes/components/note-sidebar/list-loading";
import { useNotesQuery } from "@/features/notes/hooks/use-notes-query";

export const NoteSidebarList = () => {
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
        <NoteSidebarListItem key={note.id} {...note} />
      ))}
    </SidebarList>
  );
};
