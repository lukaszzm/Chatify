import { createContext, useEffect, useState } from "react";

import { Theme } from "@/config/themes";

const THEME_STORAGE_KEY = "ui-theme";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: Theme.System,
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = Theme.System,
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = window.localStorage.getItem(storageKey);

    if (storedTheme && Object.values(Theme).includes(storedTheme as Theme)) {
      return storedTheme as Theme;
    }

    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(Theme.Dark, Theme.Light);

    if (theme === Theme.System) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? Theme.Dark
        : Theme.Light;

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      window.localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  } satisfies ThemeProviderState;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
