import { SidebarItem } from "@chatify/ui";
import { Link } from "@tanstack/react-router";

import type { Note } from "@/generated/graphql";
import { formatDate } from "@/utils/format-date";

type NotesListItemProps = Pick<Note, "id" | "title" | "updatedAt">;

export const NotesListItem = ({ id, title, updatedAt }: NotesListItemProps) => {
  return (
    <SidebarItem asChild>
      <Link
        aria-label={`View note: ${title}`}
        to="/notes/$noteId"
        params={{ noteId: id }}
        activeProps={{ className: "bg-muted/40" }}
      >
        <div className="flex w-full flex-1 justify-between">
          <span className="text-base font-semibold">{title}</span>
          <span className="text-xs text-muted-foreground">{formatDate(updatedAt)}</span>
        </div>
      </Link>
    </SidebarItem>
  );
};
