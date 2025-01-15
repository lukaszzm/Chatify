import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  Subtitle,
} from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

import { MobileBackButton } from "@/components/mobile-back-button";
import { ThemeToggle } from "@/features/settings/components/theme-toggle";

export const Route = createFileRoute("/_dashboard/settings/appearance")({
  component: Page,
});

function Page() {
  return (
    <Container>
      <div className="flex items-center gap-2">
        <MobileBackButton variant="ghost" to="/settings" />
        <Subtitle>Appearance</Subtitle>
      </div>
      <div className="space-y-4 overflow-auto p-2">
        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
          </CardHeader>
          <CardContent>
            <ThemeToggle />
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
