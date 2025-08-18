import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="monokai"
      enableSystem
      themes={[
        "monokai",
        "dracula",
        "one-dark-pro",
        "github-light",
        "vscode-light",
        "solarized",
      ]}
    >
      {children}
    </NextThemesProvider>
  );
}
