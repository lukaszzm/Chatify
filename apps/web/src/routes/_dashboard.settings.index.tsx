import { Container } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/settings/")({
  component: SettingsIndexPage,
});

function SettingsIndexPage() {
  return (
    <Container variant="ghost" className="flex justify-center items-center">
      <p className="text-muted-foreground text-center">Select what you want to change.</p>
    </Container>
  );
}
