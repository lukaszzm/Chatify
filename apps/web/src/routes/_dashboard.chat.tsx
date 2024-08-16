import { Sidebar, SidebarContent, SidebarHeader, SidebarTitle } from "@chatify/ui";
import { Outlet, createFileRoute } from "@tanstack/react-router";

import { RecentChats } from "@/features/chat";
import { Search } from "@/features/search";
import { usePathname } from "@/hooks/use-pathname";

export const Route = createFileRoute("/_dashboard/chat")({
  component: Page,
});

function Page() {
  const pathname = usePathname();

  return (
    <>
      <Sidebar hideOnMobile={pathname !== Route.fullPath}>
        <SidebarHeader className="flex-col items-stretch justify-normal gap-4">
          <Search />
          <SidebarTitle>Chats</SidebarTitle>
        </SidebarHeader>
        <SidebarContent>
          <RecentChats />
        </SidebarContent>
      </Sidebar>

      <Outlet />
    </>
  );
}
