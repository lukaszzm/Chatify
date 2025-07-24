import { Sidebar, SidebarContent, SidebarHeader, SidebarTitle } from "@chatify/ui";
import { Outlet, createFileRoute } from "@tanstack/react-router";

import { RecentChats } from "@/features/chat/components/recent-chats";
import { Search } from "@/features/search/components/search";
import { usePathname } from "@/hooks/use-pathname";
import { matchPageTitle } from "@/utils/match-page-title";

export const Route = createFileRoute("/_dashboard/chat")({
  head: () => ({
    meta: [{ title: matchPageTitle("/chat") }],
  }),
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
