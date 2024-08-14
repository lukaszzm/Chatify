import { Outlet, createFileRoute } from "@tanstack/react-router";

import { ChatSidebar } from "@/features/chat";
import { useMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/_dashboard/chat")({
  component: Page,
});

function Page() {
  const isMobile = useMobile();

  if (isMobile) {
    return <Outlet />;
  }

  return (
    <>
      <ChatSidebar />
      <Outlet />
    </>
  );
}
