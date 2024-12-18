import { useContext } from "react";
import { ThemeContext } from "./themeContext";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext deve ser usado dentro do CustomThemeProvider.");
  }

  return context;
};
