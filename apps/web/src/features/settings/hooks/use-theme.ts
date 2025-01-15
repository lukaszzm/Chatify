import { useContext } from "react";

import { ThemeContext } from "@/features/settings/contexts/theme-context";

export const useTheme = () => useContext(ThemeContext);
