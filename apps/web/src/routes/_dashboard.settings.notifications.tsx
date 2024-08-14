import { Container, Title } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

import { BackButton } from "@/components/back-button";

export const Route = createFileRoute("/_dashboard/settings/notifications")({
  component: NotificationsSettingsPage,
});

function NotificationsSettingsPage() {
  return (
    <Container>
      <div className="flex items-center gap-2">
        <BackButton variant="ghost" to="/settings" />
        <Title>Notifications</Title>
      </div>
      <p className="text-muted-foreground">
        Page under construction, please check back later.
      </p>
    </Container>
  );
}
