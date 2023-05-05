import ThemeContext from "../../contexts/theme-context";
import { useContext } from "react";
import { Topbar, Switch, Label, SettingsContainer } from "../../components/UI";

export const Appearance = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <Topbar backTo="/dashboard/settings">
        <h2>Appearance Settings</h2>
      </Topbar>
      <SettingsContainer>
        <Label htmlFor="switch">Dark mode</Label>
        <Switch withLabels onChange={toggleTheme} checked={theme === "dark"} />
      </SettingsContainer>
    </>
  );
};
