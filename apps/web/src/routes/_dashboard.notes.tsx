import { Outlet, createFileRoute } from "@tanstack/react-router";

import { NoteSidebar } from "@/features/notes";
import { useMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/_dashboard/notes")({
  component: NotesPage,
});

function NotesPage() {
  const isMobile = useMobile();

  if (isMobile) {
    return <Outlet />;
  }

  return (
    <>
      <NoteSidebar />
      <Outlet />
    </>
  );
}
