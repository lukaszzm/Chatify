import { Container, Title } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

import { MobileBackButton } from "@/components/mobile-back-button";

export const Route = createFileRoute("/_dashboard/settings/appearance")({
  component: AppearanceSettingsPage,
});

function AppearanceSettingsPage() {
  return (
    <Container>
      <div className="flex items-center gap-2">
        <MobileBackButton variant="ghost" to="/settings" />
        <Title>Appearance</Title>
      </div>
      <p className="text-muted-foreground">
        Page under construction, please check back later.
      </p>
    </Container>
  );
}
