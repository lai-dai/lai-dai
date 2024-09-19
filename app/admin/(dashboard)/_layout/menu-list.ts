import {
  Captions,
  Clapperboard,
  LayoutGrid,
  LucideIcon,
  Settings2,
  SquarePen,
} from 'lucide-react'

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
          href: '',
          label: 'Movie',
          active: false,
          icon: Clapperboard,
          submenus: [
            {
              href: '/admin/movie/now-playing',
              label: 'Now Playing',
              active: pathname === '/admin/movie/now-playing',
            },
            {
              href: '/admin/movie/populate',
              label: 'Populate',
              active: pathname === '/admin/movie/populate',
            },
            {
              href: '/admin/movie/top-rated',
              label: 'Top Rated',
              active: pathname === '/admin/movie/top-rated',
            },
          ],
        },
        {
          href: '/admin/subtitle',
          label: 'Subtitle',
          active: pathname === '/admin/subtitle',
          icon: Captions,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: '',
      menus: [
        {
          href: '/admin/setting',
          label: 'Setting',
          active: pathname === '/admin/setting',
          icon: Settings2,
          submenus: [],
        },
      ],
    },
  ]
}
