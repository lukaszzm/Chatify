import { Container, Title } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/settings/notifications")({
  component: NotificationsSettingsPage,
});

function NotificationsSettingsPage() {
  return (
    <Container>
      <Title>Notifications</Title>
      <p className="text-muted-foreground">
        Page under construction, please check back later.
      </p>
    </Container>
  );
}
