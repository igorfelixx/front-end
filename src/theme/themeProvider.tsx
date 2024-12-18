import { useState, useMemo, ReactNode } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ThemeContext, ThemeContextType } from "./themeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark" && {
            background: { default: "#121212", paper: "#1E1E1E" },
            text: { primary: "#FFFFFF", secondary: "#BBBBBB" },
          }),
        }
      }),
    [mode]
  );

  const contextValue: ThemeContextType = { mode, toggleTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
