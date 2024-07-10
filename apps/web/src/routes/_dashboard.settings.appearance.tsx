import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/settings/appearance")({
  component: AppearanceSettingsPage,
});

function AppearanceSettingsPage() {
  return <p>Appearance Settings</p>;
}
