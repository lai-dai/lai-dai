import { LayoutGrid, LucideIcon, SquarePen } from 'lucide-react'

type Submenu = {
  href: string
  label: string
  active: boolean
}

type Menu = {
  href: string
  label: string
  active: boolean
  icon: LucideIcon
  submenus: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/admin',
          label: 'Dashboard',
          active: pathname === '/admin',
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Dictionary',
      menus: [
        {
          href: '/admin/sentence/create',
          label: 'Create New Sentence',
          active: false,
          icon: SquarePen,
          submenus: [],
        },
      ],
    },
  ]
}
