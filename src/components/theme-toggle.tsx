"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"
import { TooltipContainer } from "~/components/tooltip-container"

import { Button } from "~/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <TooltipContainer>
      <Button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        size={"icon"}
        title={theme === "light" ? "Light" : "Dark"}
        variant={"ghost"}
      >
        <MoonIcon
          className={
            "rotate-90 scale-0 transition-transform duration-500 ease-in-out dark:rotate-0 dark:scale-100"
          }
        />

        <SunIcon
          className={
            "absolute rotate-0 scale-100 transition-transform duration-500 ease-in-out dark:-rotate-90 dark:scale-0"
          }
        />

        <span className={"sr-only"}>{"Switch Theme"}</span>
      </Button>
    </TooltipContainer>
  )
}
