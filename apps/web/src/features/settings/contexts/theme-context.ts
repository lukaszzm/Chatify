import { createContext } from "react";

import { Theme } from "@/features/settings/config/themes";

export interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: Theme.System,
  setTheme: () => {},
};

export const ThemeContext = createContext<ThemeProviderState>(initialState);
