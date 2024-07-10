import { SidebarInfo, SidebarList } from "@chatify/ui";

import { ErrorAlert } from "@/components/errors/error-alert";
import { NoteSidebarListItem } from "@/features/notes/components/note-sidebar/list-item";
import { NotesListSkeleton } from "@/features/notes/components/skeletons/notes-list-skeleton";
import { useNotesQuery } from "@/features/notes/hooks/use-notes-query";

export const NoteSidebarList = () => {
  const [{ data, fetching, error }] = useNotesQuery();

  if (fetching) {
    return <NotesListSkeleton />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
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
