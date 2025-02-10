"use client"

import { Monitor, MoonStar, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"
import { Label } from "~/components/ui/label"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"

const ThemeOptions = [
  {
    label: "System",
    value: "system",
    icon: Monitor,
  },
  {
    label: "Light",
    value: "light",
    icon: Sun,
  },
  {
    label: "Dark",
    value: "dark",
    icon: MoonStar,
  },
]

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const themeList = ThemeOptions.map(it => (
    <div
      aria-label={`Toggle ${it.label}`}
      key={it.value}
    >
      <RadioGroupItem
        className={"peer sr-only"}
        id={`r-${it.value}`}
        value={it.value}
      />

      <Label
        className={"inline-flex p-1.5 rounded-full peer-data-[state=checked]:bg-white peer-data-[state=checked]:border dark:peer-data-[state=checked]:bg-gray-700 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"}
        htmlFor={`r-${it.value}`}
      >
        <it.icon />
      </Label>
    </div>
  ))

  return (
    <RadioGroup
      className={
        "relative z-0 inline-grid grid-cols-3 gap-0.5 rounded-full bg-gray-950/5 p-0.5 text-gray-950 dark:bg-white/10 dark:text-white"
      }
      onValueChange={setTheme}
      value={theme ?? "dark"}
    >
      {themeList}
    </RadioGroup>
  )
}
