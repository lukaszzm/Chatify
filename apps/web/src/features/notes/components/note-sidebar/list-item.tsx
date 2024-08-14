import { SidebarItem } from "@chatify/ui";
import { Link } from "@tanstack/react-router";

import { formatDate } from "@/utils/format-date";

interface NoteSidebarListItemProps {
  id: string;
  title: string;
  updatedAt: string;
}

export const NoteSidebarListItem = ({
  id,
  title,
  updatedAt,
}: NoteSidebarListItemProps) => {
  return (
    <SidebarItem asChild>
      <Link
        aria-label={`View note: ${title}`}
        to="/notes/$noteId"
        params={{ noteId: id }}
        activeProps={{ className: "bg-muted/40" }}
      >
        <div className="flex w-full flex-1 justify-between">
          <h3 className="text-base font-semibold">{title}</h3>
          <span className="text-xs text-muted-foreground/60">
            {formatDate(updatedAt)}
          </span>
        </div>
      </Link>
    </SidebarItem>
  );
};
