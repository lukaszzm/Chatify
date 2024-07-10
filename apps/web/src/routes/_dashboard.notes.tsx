import { Outlet, createFileRoute } from "@tanstack/react-router";

import { NoteSidebar } from "@/features/notes";

export const Route = createFileRoute("/_dashboard/notes")({
  component: NotesPage,
});

function NotesPage() {
  return (
    <>
      <NoteSidebar />
      <Outlet />
    </>
  );
}
