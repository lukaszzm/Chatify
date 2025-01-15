import { ToggleGroup, ToggleGroupItem } from "@chatify/ui";
import { CompassIcon, MoonIcon, SunIcon } from "lucide-react";

import { Theme } from "@/features/settings/config/themes";
import { useTheme } from "@/features/settings/hooks/use-theme";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup
      value={theme}
      onValueChange={setTheme}
      type="single"
      variant="outline"
      className="justify-start gap-2"
    >
      <ToggleGroupItem value={Theme.Light} size="lg">
        <SunIcon className="size-4" />
        <span>Light</span>
      </ToggleGroupItem>
      <ToggleGroupItem value={Theme.Dark} size="lg">
        <MoonIcon className="size-4" />
        <span>Dark</span>
      </ToggleGroupItem>
      <ToggleGroupItem value={Theme.System} size="lg">
        <CompassIcon className="size-4" />
        <span>Match Browser</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
