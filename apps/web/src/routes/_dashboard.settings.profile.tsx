import { Container, Subtitle } from "@chatify/ui";
import { createFileRoute } from "@tanstack/react-router";

import { MobileBackButton } from "@/components/mobile-back-button";
import { DeleteAccount } from "@/features/settings/components/delete-account";
import { ProfileInfo } from "@/features/settings/components/profile-info";
import { UpdatePassword } from "@/features/settings/components/update-password";
import { UpdateProfilePicture } from "@/features/settings/components/update-profile-picture";

export const Route = createFileRoute("/_dashboard/settings/profile")({
  component: ProfileSettingsPage,
});

function ProfileSettingsPage() {
  return (
    <Container className="flex flex-col">
      <div className="flex items-center gap-2">
        <MobileBackButton variant="ghost" to="/settings" />
        <Subtitle>My Profile</Subtitle>
      </div>
      <div className="space-y-4 overflow-auto p-2">
        <UpdateProfilePicture />
        <ProfileInfo />
        <UpdatePassword />
        <DeleteAccount />
      </div>
    </Container>
  );
}
