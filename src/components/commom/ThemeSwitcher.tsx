"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : "Theme"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("monokai")}>
          monokai
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("one-dark-pro")}>
          one-dark-pro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("github-light")}>
          github-light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("vscode-light")}>
          vscode-light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dracula")}>
          dracula
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("solarized")}>
          solarized
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
