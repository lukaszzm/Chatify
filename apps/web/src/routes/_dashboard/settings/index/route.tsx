import { Container } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/settings/")({
  component: Page,
});

function Page() {
  return (
    <Container variant="ghost" className="hidden items-center justify-center md:flex">
      <p className="text-center text-muted-foreground">Select what you want to change.</p>
    </Container>
  );
}
