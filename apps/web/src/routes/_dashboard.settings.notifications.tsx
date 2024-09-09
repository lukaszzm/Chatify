import { Container, Subtitle } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

import { MobileBackButton } from "@/components/mobile-back-button";

export const Route = createFileRoute("/_dashboard/settings/notifications")({
  component: NotificationsSettingsPage,
});

function NotificationsSettingsPage() {
  return (
    <Container>
      <div className="flex items-center gap-2">
        <MobileBackButton variant="ghost" to="/settings" />
        <Subtitle>Notifications</Subtitle>
      </div>
      <p className="text-muted-foreground">
        Page under construction, please check back later.
      </p>
    </Container>
  );
}
