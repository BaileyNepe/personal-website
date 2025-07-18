'use client'

import clsx from 'clsx'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Container } from '@/components/Container'
import { Line } from '@/components/Line'
import { getRoutes } from '@/utils/routes'
import { BookIcon } from './Icons/BookIcon'
import { BriefcaseIcon } from './Icons/BriefcaseIcon'
import { GridIcon } from './Icons/GridIcon'
import { HomeIcon } from './Icons/HomeIcon'
import { MoonIcon } from './Icons/MoonIcon'
import { PersonIcon } from './Icons/PersonIcon'
import { SunIcon } from './Icons/SunIcon'

// Icon mapping for routes
const routeIcons = {
  '/': HomeIcon,
  '/projects': GridIcon,
  '/work': BriefcaseIcon,
  '/about': PersonIcon,
  '/education': BookIcon,
}

function NavItem({ 
  href, 
  children, 
  icon: Icon,
  iconOnly = false,
  isMobile = false
}: { 
  href: string
  children: React.ReactNode
  icon?: React.ComponentType<React.ComponentPropsWithoutRef<'svg'>>
  iconOnly?: boolean
  isMobile?: boolean
}) {
  let isActive = usePathname() === href

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative flex items-center gap-2 px-3 py-2 transition',
          isActive
            ? 'text-teal-500 dark:text-teal-400'
            : 'hover:text-teal-500 dark:hover:text-teal-400',
        )}
      >
        {Icon && (
          <Icon className={clsx(
            'h-4 w-4',
            isActive ? 'fill-teal-500/10 stroke-teal-500 dark:fill-teal-400/10 dark:stroke-teal-400' : 'stroke-current'
          )} />
        )}
        {!iconOnly && (
          <span className={isMobile ? "text-xs" : "hidden sm:block"}>{children}</span>
        )}
        {isActive && (
          <span className={clsx(
            "absolute inset-x-1 h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0",
            isMobile ? "-top-px" : "-bottom-px"
          )} />
        )}
      </Link>
    </li>
  )
}

function ThemeToggle() {
  let { resolvedTheme, setTheme } = useTheme()
  let otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
  let [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
      className="group rounded-full bg-white/90 px-2 py-1 shadow-lg shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20 cursor-pointer"
      onClick={() => setTheme(otherTheme)}
    >
      <SunIcon className="h-4 w-4 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600" />
      <MoonIcon className="hidden h-4 w-4 fill-zinc-700 stroke-zinc-500 transition not-[@media_(prefers-color-scheme:dark)]:fill-teal-400/10 not-[@media_(prefers-color-scheme:dark)]:stroke-teal-500 dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400" />
    </button>
  )
}

function Navigation({ isMobile = false }: { isMobile?: boolean }) {
  const routes = getRoutes()
  const otherRoutes = routes.filter(route => route.path !== '/')
  
  return (
    <ul className="flex items-center rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
      {/* Home - icon only */}
      <NavItem href="/" icon={HomeIcon} iconOnly isMobile={isMobile}>
        Home
      </NavItem>
      
      {/* Divider */}
      <li className="px-2">
        <Line />
      </li>
      
      {/* Other routes with icons and labels */}
      {otherRoutes.map((route) => {
        const Icon = routeIcons[route.path as keyof typeof routeIcons]
        return (
          <NavItem key={route.path} href={route.path} icon={Icon} isMobile={isMobile}>
            {route.label}
          </NavItem>
        )
      })}
      
      {/* Divider before theme toggle */}
      <li className="px-2">
        <Line />
      </li>
      
      {/* Theme toggle */}
      <li>
        <ThemeToggle />
      </li>
    </ul>
  )
}

export function Header() {
  return (
    <>
      {/* Desktop Navigation - Top */}
      <header className="pointer-events-none relative z-50 flex flex-none flex-col hidden md:block">
        <div className="top-0 z-10 h-16 pt-6">
          <Container className="w-full">
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                {/* Avatar could go here if needed */}
              </div>
              <div className="flex flex-1 justify-center">
                <nav className="pointer-events-auto">
                  <Navigation />
                </nav>
              </div>
              <div className="flex justify-end flex-1">
                {/* Additional content could go here */}
              </div>
            </div>
          </Container>
        </div>
      </header>

      {/* Mobile Navigation - Bottom */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto md:hidden">
        <Navigation isMobile />
      </nav>
    </>
  )
}
