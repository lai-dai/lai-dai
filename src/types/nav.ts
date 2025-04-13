import { LucideIcon } from "lucide-react"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: LucideIcon
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export type MainNavItem = NavItemWithChildren

export type SidebarNavItem = NavItemWithChildren & {
  separator?: boolean
}
