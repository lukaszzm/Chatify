import { Button } from "@chatify/ui";
import { Link } from "@tanstack/react-router";

interface NotesItemProps {
  id: string;
  title: string;
}

export const NotesItem = ({ id, title }: NotesItemProps) => {
  return (
    <Button variant="ghost" asChild className="w-full justify-start rounded-md">
      <Link
        to="/notes/$noteId"
        params={{ noteId: id }}
        activeProps={{ className: "bg-muted/40" }}
      >
        {title}
      </Link>
    </Button>
  );
};
