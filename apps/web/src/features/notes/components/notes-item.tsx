import { Button } from "@chatify/ui";
import { Link } from "@tanstack/react-router";

import { formatDate } from "@/utils/format-date";

interface NotesItemProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export const NotesItem = ({ id, title, content, createdAt }: NotesItemProps) => {
  return (
    <Button
      variant="ghost"
      size="auto"
      asChild
      className="p-3 rounded-sm justify-start items-center gap-2 w-full hover:bg-muted/40"
    >
      <Link
        aria-label={`View note: ${title}`}
        to="/notes/$noteId"
        params={{ noteId: id }}
        activeProps={{ className: "bg-muted/40" }}
      >
        <div className="flex-1 text-left min-w-0">
          <div className="flex justify-between w-full">
            <h3 className="font-semibold text-primary text-base">{title}</h3>
            <span className="text-xs text-muted-foreground/60">
              {formatDate(createdAt)}
            </span>
          </div>
          <p className="text-muted-foreground/80 text-xs truncate">{content}</p>
        </div>
      </Link>
    </Button>
  );
};
