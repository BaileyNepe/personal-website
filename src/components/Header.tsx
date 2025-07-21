'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

import { Container } from '@/components/Container'
import { Line } from '@/components/Line'
import { getRoutes } from '@/utils/routes'
import { BriefcaseIcon } from './Icons/BriefcaseIcon'
import { GridIcon } from './Icons/GridIcon'
import { HomeIcon } from './Icons/HomeIcon'
import { MoonIcon } from './Icons/MoonIcon'
import { PersonIcon } from './Icons/PersonIcon'
import { SchoolIcon } from './Icons/SchoolIcon'
import { SunIcon } from './Icons/SunIcon'

// Icon mapping for routes
const routeIcons = {
  '/': HomeIcon,
  '/projects': GridIcon,
  '/work': BriefcaseIcon,
  '/about': PersonIcon,
  '/education': SchoolIcon
}

const NavItem = ({
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
}) => {
  const isActive = usePathname() === href

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative flex items-center gap-2 transition',
          isMobile ? 'px-3 py-3' : 'px-3 py-2',
          isActive
            ? 'text-teal-500 dark:text-teal-400'
            : 'hover:text-teal-500 dark:hover:text-teal-400'
        )}
      >
        {Icon && (
          <Icon
            className={clsx(
              isMobile ? 'h-5 w-5' : 'h-4 w-4',
              isActive
                ? 'fill-teal-500/10 stroke-teal-500 dark:fill-teal-400/10 dark:stroke-teal-400'
                : 'stroke-current'
            )}
          />
        )}
        {!iconOnly && <span className='hidden sm:block'>{children}</span>}
        {isActive && (
          <span
            className={clsx(
              'absolute inset-x-1 h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0',
              isMobile ? '-top-px' : '-bottom-px'
            )}
          />
        )}
      </Link>
    </li>
  )
}

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type='button'
      aria-label={`Switch to ${otherTheme} theme`}
      className='group cursor-pointer rounded-full bg-white/90 px-2 py-1 shadow-lg shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20'
      onClick={() => setTheme(otherTheme)}
    >
      <SunIcon className='h-4 w-4 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600' />
      <MoonIcon className='hidden h-4 w-4 fill-zinc-700 stroke-zinc-500 transition not-[@media_(prefers-color-scheme:dark)]:fill-teal-400/10 not-[@media_(prefers-color-scheme:dark)]:stroke-teal-500 dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400' />
    </button>
  )
}

const Navigation = ({ isMobile = false }: { isMobile?: boolean }) => {
  const routes = getRoutes()
  const otherRoutes = routes.filter((route) => route.path !== '/')

  return (
    <ul
      className={clsx(
        'flex items-center rounded-full bg-white/90 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10',
        isMobile ? 'px-4 py-1' : 'px-3'
      )}
    >
      {/* Home - icon only */}
      <NavItem href='/' icon={HomeIcon} iconOnly isMobile={isMobile}>
        Home
      </NavItem>

      {/* Divider */}
      <li className='px-2'>
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
      <li className='px-2'>
        <Line />
      </li>

      {/* Theme toggle */}
      <li>
        <ThemeToggle />
      </li>
    </ul>
  )
}

export const Header = () => {
  return (
    <>
      {/* Desktop Navigation - Top */}
      <header className='pointer-events-none relative z-50 hidden flex-none flex-col md:block'>
        <div className='top-0 z-10 h-16 pt-6'>
          <Container className='w-full'>
            <div className='relative flex justify-center'>
              <nav className='pointer-events-auto'>
                <Navigation />
              </nav>
            </div>
          </Container>
        </div>
      </header>

      {/* Mobile Navigation - Bottom */}
      <nav className='pointer-events-auto fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform md:hidden'>
        <Navigation isMobile />
      </nav>
    </>
  )
}
