import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/settings/notifications")({
  component: NotificationsSettingsPage,
});

function NotificationsSettingsPage() {
  return <p>Notifications Settings</p>;
}
