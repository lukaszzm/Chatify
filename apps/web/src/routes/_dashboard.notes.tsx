import { Sidebar, SidebarContent, SidebarHeader, SidebarTitle } from "@chatify/ui";
import { Outlet, createFileRoute } from "@tanstack/react-router";

import { NewNote } from "@/features/notes/components/new-note";
import { NotesList } from "@/features/notes/components/notes-list";
import { usePathname } from "@/hooks/use-pathname";

export const Route = createFileRoute("/_dashboard/notes")({
  component: NotesPage,
});

function NotesPage() {
  const pathname = usePathname();

  return (
    <>
      <Sidebar hideOnMobile={pathname !== Route.fullPath}>
        <SidebarHeader>
          <SidebarTitle>Notes</SidebarTitle>
          <NewNote />
        </SidebarHeader>
        <SidebarContent>
          <NotesList />
        </SidebarContent>
      </Sidebar>

      <Outlet />
    </>
  );
}
