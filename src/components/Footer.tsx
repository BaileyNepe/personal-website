import Link from 'next/link'

import { ContainerInner, ContainerOuter } from '@/components/Container'
import { getRoutes } from '@/utils/routes'

export const Footer = () => {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {Object.entries(getRoutes()).map(([_, { label, path }]) => (
                  <Link
                    href={path}
                    key={path}
                    className="transition hover:text-teal-500 dark:hover:text-teal-400"
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Bailey Nepe. All rights reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
export default Footer
