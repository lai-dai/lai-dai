'use client'

import * as React from 'react'
import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { Logo } from './logo'

export function MainNav() {
  return (
    <div className="mr-3 hidden w-full justify-between gap-3 md:flex">
      <Link href="/" className="flex items-center space-x-2 lg:mr-6">
        <Logo className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      <NavigationMenuDemo />
    </div>
  )
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'React js',
    href: '/docs/reactjs',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Next js',
    href: '/docs/nextjs',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Tailwind css',
    href: '/docs/tailwindcss',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Shadcn',
    href: '/docs/shadcn',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tantask',
    href: '/docs/tantask',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Jotai',
    href: '/docs/jotai',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Logo className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        {siteConfig.author}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Nơi góc chia sẻ những bí kíp, thủ thuật mình tìm hiểu
                        được với Reactjs, Nextjs
                      </p>
                    </a>
                  </NavigationMenuLink>
                </Link>
              </li>
              <Link href="/about-me" legacyBehavior passHref>
                <ListItem href="/about-me" title="About me">
                  Công việc khiến mình cảm thấy vui
                </ListItem>
              </Link>
              <Link href="/projects" legacyBehavior passHref>
                <ListItem href="/projects" title="Projects">
                  Tất cả những dự án của mình nằm ở đây
                </ListItem>
              </Link>
              <Link href="/blogs" legacyBehavior passHref>
                <ListItem href="/blogs" title="Blogs">
                  Chia sẻ dữ liệu, các link và tin tức
                </ListItem>
              </Link>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Doc</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <Link
                  key={component.title}
                  href={component.href}
                  legacyBehavior
                  passHref
                >
                  <ListItem title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
