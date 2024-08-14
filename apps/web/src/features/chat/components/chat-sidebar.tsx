import { Sidebar, SidebarContent, SidebarHeader, SidebarTitle } from "@chatify/ui";

import { RecentChats } from "@/features/chat/components/recent-chats";
import { Search } from "@/features/search";

export const ChatSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="flex-col items-stretch justify-normal gap-4">
        <Search />
        <SidebarTitle>Chats</SidebarTitle>
      </SidebarHeader>
      <SidebarContent>
        <RecentChats />
      </SidebarContent>
    </Sidebar>
  );
};
