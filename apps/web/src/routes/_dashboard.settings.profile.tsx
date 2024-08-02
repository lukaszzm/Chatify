import { Container, ScrollArea, Title } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

import { DeleteAccount, ProfileInfo, UpdatePassword } from "@/features/settings";

export const Route = createFileRoute("/_dashboard/settings/profile")({
  component: ProfileSettingsPage,
});

function ProfileSettingsPage() {
  return (
    <Container className="flex flex-col">
      <Title>My Profile</Title>
      <ScrollArea>
        <div className="space-y-4 p-3">
          <ProfileInfo />
          <UpdatePassword />
          <DeleteAccount />
        </div>
      </ScrollArea>
    </Container>
  );
}
