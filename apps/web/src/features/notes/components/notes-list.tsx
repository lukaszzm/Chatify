import { ErrorComponent, SidebarInfo, SidebarList } from "@chatify/ui";

import { NotesListItem } from "@/features/notes/components/notes-list-item";
import { NotesListLoading } from "@/features/notes/components/notes-list-loading";
import { NotesListMore } from "@/features/notes/components/notes-list-more";
import { useNotesQuery } from "@/features/notes/hooks/use-notes-query";

export const NotesList = () => {
  const [{ data, fetching, error }] = useNotesQuery();

  if (fetching) {
    return <NotesListLoading />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  if (!data || data.notes.edges.length === 0) {
    return <SidebarInfo>No notes found. Create a new note to get started.</SidebarInfo>;
  }

  return (
    <SidebarList>
      {data.notes.edges.map(({ node }) => (
        <NotesListItem key={node.id} {...node} />
      ))}

      {data.notes.pageInfo.hasNextPage && (
        <NotesListMore cursor={data.notes.pageInfo.endCursor} />
      )}
    </SidebarList>
  );
};
