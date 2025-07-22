'use client'

import Image from 'next/image'
import { Marquee } from '@/components/magicui/marquee'
import awsLogo from '@/images/logos/aws-color.svg'
import bunLogo from '@/images/logos/bun.svg'
import playwrightLogo from '@/images/logos/playwright.svg'
import { cn } from '@/lib/utils'

const techStack: { name: string; slug: string; icon?: string }[] = [
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'AWS', slug: 'aws', icon: awsLogo },
  { name: 'Terraform', slug: 'terraform' },
  { name: 'Railway', slug: 'railway' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Bun', slug: 'bun', icon: bunLogo },
  { name: 'Go', slug: 'go' },
  { name: 'React', slug: 'react' },
  { name: 'Redux', slug: 'redux' },
  { name: 'React Query', slug: 'reactquery' },
  { name: 'Auth0', slug: 'auth0' },
  { name: 'Docker', slug: 'docker' },
  { name: 'tRPC', slug: 'trpc' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'Vitest', slug: 'vitest' },
  { name: 'Playwright', slug: 'playwright', icon: playwrightLogo },
  { name: 'Jest', slug: 'jest' },
  { name: 'React Testing Library', slug: 'testinglibrary' },
  { name: 'Redis', slug: 'redis' },
  { name: 'Prisma', slug: 'prisma' },
  { name: 'WebSockets', slug: 'socketdotio' },
  { name: 'GitHub Actions', slug: 'githubactions' }
]

const TechIcon = ({ name, slug }: { name: string; slug: string }) => {
  const getIconSrc = () => {
    const techIcon = techStack.find((tech) => tech.slug === slug)?.icon
    return techIcon ?? `https://cdn.simpleicons.org/${slug}/${slug}`
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center min-w-fit px-4 group cursor-pointer relative'
      )}
      title={name}
    >
      <div className='flex h-16 w-16 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md dark:bg-zinc-800 dark:ring-zinc-700'>
        <Image
          src={getIconSrc()}
          alt={`${name} icon`}
          width={32}
          height={32}
          className='h-8 w-8 transition-transform duration-300'
          unoptimized
        />
      </div>
    </div>
  )
}

export const TechStack = () => {
  return (
    <div className='sm:px-8'>
      <div className='relative w-full overflow-hidden mx-auto lg:px-8 max-w-7xl'>
        <div className='relative flex items-center min-h-[120px]'>
          <Marquee pauseOnHover className='[--duration:100s]'>
            {techStack.map((tech) => (
              <TechIcon key={tech.slug} name={tech.name} slug={tech.slug} />
            ))}
          </Marquee>

          <div className='pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-50 to-transparent dark:from-zinc-800/50 z-10' />
          <div className='pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-50 to-transparent dark:from-zinc-800/50 z-10' />
        </div>
      </div>
    </div>
  )
}
