"use client"

import { Monitor, MoonStar, Sun, LucideIcon } from "lucide-react"
import { useTheme } from "next-themes"
import React from "react"
import { Label } from "~/components/ui/label"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"

const ThemeOptions: [string, string, LucideIcon][] = [
  ["System", "system", Monitor],
  ["Light", "light", Sun],
  ["Dark", "dark", MoonStar],
]

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const themeList = ThemeOptions.map(([label, value, Icon]) => (
    <div aria-label={`Toggle ${label}`} key={value}>
      <RadioGroupItem
        className={"peer sr-only"}
        id={`r-${value}`}
        value={value}
      />

      <Label
        className={
          "inline-flex rounded-sm p-1.5 peer-data-[state=checked]:border peer-data-[state=checked]:bg-white hover:dark:bg-gray-700/30 dark:peer-data-[state=checked]:bg-gray-700 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        }
        htmlFor={`r-${value}`}>
        <Icon />
      </Label>
    </div>
  ))

  return (
    <RadioGroup
      className={
        "relative z-0 inline-grid grid-cols-3 gap-0.5 rounded-md bg-gray-950/5 p-0.5 text-gray-950 dark:bg-white/10 dark:text-white"
      }
      onValueChange={value => {
        setTheme(value)
      }}
      value={theme}>
      {themeList}
    </RadioGroup>
  )
}
