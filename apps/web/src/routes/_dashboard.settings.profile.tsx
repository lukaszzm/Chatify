import { Container, Title } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

import { MobileBackButton } from "@/components/mobile-back-button";
import { DeleteAccount, ProfileInfo, UpdatePassword } from "@/features/settings";

export const Route = createFileRoute("/_dashboard/settings/profile")({
  component: ProfileSettingsPage,
});

function ProfileSettingsPage() {
  return (
    <Container className="flex flex-col">
      <div className="flex items-center gap-2">
        <MobileBackButton variant="ghost" to="/settings" />
        <Title>My Profile</Title>
      </div>
      <div className="space-y-4 overflow-auto p-2">
        <ProfileInfo />
        <UpdatePassword />
        <DeleteAccount />
      </div>
    </Container>
  );
}
