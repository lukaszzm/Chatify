import {
  SearchInput,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTitle,
} from "@chatify/ui";

import { ChatSidebarList } from "@/features/chat/components/chat-sidebar/list";

export const ChatSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="flex-col items-stretch justify-normal gap-4">
        <SearchInput placeholder="Search chats" />
        <SidebarTitle>Chats</SidebarTitle>
      </SidebarHeader>
      <SidebarContent>
        <ChatSidebarList />
      </SidebarContent>
    </Sidebar>
  );
};
