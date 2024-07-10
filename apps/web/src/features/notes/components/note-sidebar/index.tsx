import { Sidebar, SidebarContent, SidebarHeader, SidebarTitle } from "@chatify/ui";

import { NewNote } from "@/features/notes/components/new-note";
import { NoteSidebarList } from "@/features/notes/components/note-sidebar/list";

export const NoteSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarTitle>Notes</SidebarTitle>
        <NewNote />
      </SidebarHeader>
      <SidebarContent>
        <NoteSidebarList />
      </SidebarContent>
    </Sidebar>
  );
};
