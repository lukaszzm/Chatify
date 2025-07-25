import { Sidebar, SidebarContent, SidebarHeader, SidebarTitle } from "@chatify/ui";
import { Outlet, createFileRoute } from "@tanstack/react-router";

import { CreateNote } from "@/features/notes/components/create-note";
import { NotesList } from "@/features/notes/components/notes-list";
import { usePathname } from "@/hooks/use-pathname";
import { matchPageTitle } from "@/utils/match-page-title";

export const Route = createFileRoute("/_dashboard/notes")({
  head: () => ({
    meta: [{ title: matchPageTitle("/notes") }],
  }),
  component: Page,
});

function Page() {
  const pathname = usePathname();

  return (
    <>
      <Sidebar hideOnMobile={pathname !== Route.fullPath}>
        <SidebarHeader>
          <SidebarTitle>Notes</SidebarTitle>
          <CreateNote />
        </SidebarHeader>
        <SidebarContent>
          <NotesList />
        </SidebarContent>
      </Sidebar>

      <Outlet />
    </>
  );
}
