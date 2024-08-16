import { Sidebar, SidebarContent, SidebarHeader, SidebarTitle } from "@chatify/ui";
import { Outlet, createFileRoute } from "@tanstack/react-router";

import { NewNote, NotesList } from "@/features/notes";
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
