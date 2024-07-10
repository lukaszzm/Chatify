import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/settings/profile")({
  component: ProfileSettingsPage,
});

function ProfileSettingsPage() {
  return <p>Profile Settings</p>;
}
