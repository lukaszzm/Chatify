import { Container } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

import { SettingsSidebar } from "@/features/settings";
import { useMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/_dashboard/settings/")({
  component: SettingsIndexPage,
});

function SettingsIndexPage() {
  const isMobile = useMobile();

  if (isMobile) {
    return <SettingsSidebar />;
  }

  return (
    <Container variant="ghost" className="flex items-center justify-center">
      <p className="text-center text-muted-foreground">Select what you want to change.</p>
    </Container>
  );
}
