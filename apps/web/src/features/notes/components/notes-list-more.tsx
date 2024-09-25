import { Button } from "@chatify/ui";
import { useCallback } from "react";
import { toast } from "sonner";

import { NotesListItem } from "@/features/notes/components/notes-list-item";
import { useNotesQuery } from "@/features/notes/hooks/use-notes-query";

interface NotesListMoreProps {
  cursor?: string | null;
}

export const NotesListMore = ({ cursor }: NotesListMoreProps) => {
  const [{ data, fetching, error }, executeQuery] = useNotesQuery({
    after: cursor,
    requestPolicy: "cache-only",
    pause: !cursor,
  });

  const onLoadMore = useCallback(() => {
    executeQuery({ requestPolicy: "cache-first" });
  }, [executeQuery]);

  if (error) {
    toast.error("Failed to load more notes");
    return null;
  }

  if (!data) {
    return (
      <Button
        variant="muted"
        size="sm"
        className="min-h-8 w-full"
        onClick={onLoadMore}
        isLoading={fetching}
      >
        Load more...
      </Button>
    );
  }

  return (
    <>
      {data.notes.edges.map(({ node }) => (
        <NotesListItem key={node.id} {...node} />
      ))}

      {data.notes.pageInfo.hasNextPage && (
        <NotesListMore cursor={data.notes.pageInfo.endCursor} />
      )}
    </>
  );
};
