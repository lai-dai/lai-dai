"use client"

import { ChevronDown, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Icons } from "./icons"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
  SidebarSeparator,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarHeader,
} from "~/components/ui/sidebar"
import { siteConfig } from "~/config/site"
import React from "react"

export interface MenuEntry {
  children?: MenuEntry[]
  icon?: LucideIcon
  label?: string
  separator?: boolean
  title?: string
  url?: string
}

export function AppSidebar({ menuList }: { menuList: MenuEntry[] }) {
  const { isMobile } = useSidebar()

  return (
    <Sidebar
      className={
        "fixed z-30 hidden max-h-svh w-full shrink-0 overflow-auto border-r border-dashed border-border/40 bg-background dark:border-border md:sticky md:block"
      }
      collapsible={isMobile ? "offcanvas" : "none"}>
      <SidebarHeader className={"h-16 justify-center px-4 md:hidden"}>
        <div className={"flex items-center gap-2"}>
          <Link
            className={"flex items-center gap-2 font-bold"}
            href={"https://ui.shadcn.com/"}
            referrerPolicy={"no-referrer"}>
            <Icons.logo className={"h-6 w-6"} />

            {"Shadcn"}
          </Link>

          <Link className={"text-sm text-muted-foreground"} href={"/"}>
            {siteConfig.name}
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className={"no-scrollbar h-full overflow-auto"}>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuList.map((it, idx) => (
                  <Tree key={idx} {...it} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>

      <SidebarFooter className={"h-16 justify-center px-4 md:h-24"} />
    </Sidebar>
  )
}

function Tree({ isSubMenu, ...props }: MenuEntry & { isSubMenu?: boolean }) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  if (props.separator) {
    return <SidebarSeparator />
  }

  if (props.label) {
    return <SidebarGroupLabel>{props.label}</SidebarGroupLabel>
  }

  const handleActive = React.useCallback(
    (url?: string) => {
      if (!url) {
        return false
      }

      if (/^(?:\/|\/docs)$/.test(url)) {
        return pathname === url
      }

      return pathname.startsWith(url)
    },
    [pathname],
  )

  if (!props?.children?.length) {
    const Comp = isSubMenu ? SidebarMenuSubButton : SidebarMenuButton
    const activeDD = handleActive(props.url)

    return (
      <Comp
        asChild={true}
        isActive={activeDD}
        onClick={() => setOpenMobile(false)}
        title={props.title}
        tooltip={props.title}>
        <Link href={props.url ?? "#"}>
          {!isSubMenu && (props.icon ? <props.icon /> : null)}

          <span className={"grow truncate leading-5"}>{props.title}</span>
        </Link>
      </Comp>
    )
  }

  const Comp = isSubMenu ? SidebarMenuSubItem : SidebarMenuItem

  return (
    <Comp>
      <Collapsible
        className={
          "group/collapsible [&[data-state=open]>button>svg:last-child]:rotate-90"
        }
        defaultOpen={true}>
        <CollapsibleTrigger asChild={true}>
          <SidebarMenuButton title={props?.title}>
            {!isSubMenu && (props?.icon ? <props.icon /> : null)}

            <span className={"grow truncate leading-5"}>{props?.title}</span>

            <ChevronDown
              className={"ml-auto transition-transform duration-200"}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        {Array.isArray(props?.children) && (
          <CollapsibleContent
            className={
              "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
            }>
            <SidebarMenuSub className={"mr-0 pr-0"}>
              {props?.children.map((child, idx) => (
                <Tree isSubMenu={true} key={idx} {...child} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </Collapsible>
    </Comp>
  )
}
