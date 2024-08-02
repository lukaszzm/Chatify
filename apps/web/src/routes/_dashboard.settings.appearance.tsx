import { Container, Title } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/settings/appearance")({
  component: AppearanceSettingsPage,
});

function AppearanceSettingsPage() {
  return (
    <Container>
      <Title>Appearance</Title>
      <p className="text-muted-foreground">
        Page under construction, please check back later.
      </p>
    </Container>
  );
}
