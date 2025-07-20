import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { ArrowDownIcon } from '@/components/Icons/ArrowDownIcon'
import { ArrowRightIcon } from '@/components/Icons/ArrowRightIcon'
import { BriefcaseIcon } from '@/components/Icons/BriefcaseIcon'
import { ChevronRightIcon } from '@/components/Icons/ChevronRightIcon'
import { SchoolIcon } from '@/components/Icons/SchoolIcon'
import { SocialLinks } from '@/components/SocialLink'
import avatarImage from '@/images/avatar.webp'
import logoDevelopersInstitute from '@/images/logos/developers-institute.webp'
import logoNumberWorksNWords from '@/images/logos/nww.webp'
import logoWaikatoAviation from '@/images/logos/waikato-aviation.webp'
import { formatDate } from '@/lib/formatDate'
import { getAllProjects, type Project, type WithSlug } from '@/lib/slugImports'
import { routes } from '@/utils/routes'

const Project = ({ project }: { project: WithSlug<Project> }) => {
  return (
    <Card as='article'>
      <Card.Title href={`/projects/${project.slug}`}>{project.title}</Card.Title>
      <Card.Eyebrow as='time' dateTime={project.date} decorate>
        {formatDate(project.date)}
      </Card.Eyebrow>
      <Card.Description>{project.description}</Card.Description>
      <Card.Cta>View project</Card.Cta>
    </Card>
  )
}

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
  url: string
}

const Role = ({ role }: { role: Role }) => {
  const startLabel = typeof role.start === 'string' ? role.start : role.start.label
  const startDate = typeof role.start === 'string' ? role.start : role.start.dateTime

  const endLabel = typeof role.end === 'string' ? role.end : role.end.label
  const endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <Link href={role.url} className='block'>
      <li className='group flex cursor-pointer gap-4'>
        <div className='relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0'>
          <Image
            src={role.logo}
            alt=''
            className='h-7 w-7 rounded-full object-contain object-center'
            unoptimized
          />
        </div>
        <dl className='flex flex-auto flex-wrap gap-x-2'>
          <dt className='sr-only'>Company</dt>
          <dd className='flex flex-none items-center gap-2 text-sm font-medium text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300'>
            {role.company}
            <ChevronRightIcon className='h-4 w-4 translate-x-[-8px] stroke-zinc-400 font-bold opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:stroke-zinc-500' />
          </dd>
          <dt className='sr-only'>Date</dt>
          <dd
            className='ml-auto text-xs text-zinc-400 dark:text-zinc-500'
            
          >
            <time dateTime={startDate}>{startLabel}</time>{' '}
            <span aria-hidden='true'>—</span> <time dateTime={endDate}>{endLabel}</time>
          </dd>
          <dt className='sr-only'>Role</dt>
          <dd className='w-full text-xs text-zinc-500 dark:text-zinc-400'>
            {role.title}
          </dd>
        </dl>
      </li>
    </Link>
  )
}

const resume: Array<Role> = [
  {
    company: "NumberWorks'nWords",
    title: 'Software Engineer',
    logo: logoNumberWorksNWords,
    start: '2022',
    end: {
      label: 'Present',
      dateTime: new Date().getFullYear().toString()
    },
    url: '/work/numberworksnwords'
  },
  {
    company: 'Waikato Aviation',
    title: 'Deputy Chief Flying Instructor',
    logo: logoWaikatoAviation,
    start: '2016',
    end: '2020',
    url: '/work/waikato-aviation'
  }
]

const roles: Role[] = [
  {
    company: 'Developers Institute',
    title: 'Level 6 Diploma in Software Development',
    logo: logoDevelopersInstitute,
    start: '2021',
    end: '2022',
    url: '/education/developers-institute'
  },
  {
    company: 'Waikato Aviation',
    title: 'Level 6 Diploma in Aviation',
    logo: logoWaikatoAviation,
    start: '2015',
    end: '2016',
    url: '/education/waikato-aviation'
  }
]

const InfoBlock = ({
  children,
  title,
  cta,
  icon
}: {
  children: React.ReactNode
  title: string
  cta?: React.ReactNode
  icon: React.ReactNode
}) => {
  console.log('tes')
  return (
    <div className='rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700/40'>
      <h2 className='flex text-sm font-semibold text-zinc-900 dark:text-zinc-100'>
        {icon}
        <span className='ml-3'>{title}</span>
      </h2>
      <ol className='mt-6 space-y-4'>{children}</ol>
      {cta}
    </div>
  )
}

const Home = async () => {
  const projects = (await getAllProjects()).slice(0, 2)
  console.log(projects)

  return (
    <>
      <Container className='mt-12 md:mt-24'>
        <div className='max-w-2xl lg:max-w-5xl'>
          <div className='flex flex-col items-center gap-8 text-center'>
            <div className='flex justify-center'>
              <Image
                src={avatarImage}
                alt='Avatar'
                className='h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32 lg:h-36 lg:w-36'
                priority
              />
            </div>
            <div>
              <h1 className='text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100'>
                Software Engineer, founder, and amateur astronaut.
              </h1>
              <p className='mt-6 text-base text-zinc-600 dark:text-zinc-400'>
                Hi, I&apos;m Bailey 👋. I am a software engineer based in Morrinsville,
                New Zealand. I&apos;m the founder and CEO of Planetaria, where we develop
                technologies that empower regular people to explore space on their own
                terms.
              </p>
              <div className='mt-6 flex justify-center gap-6'>
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className='mt-24 md:mt-28'>
        <div className='mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2'>
          <div className='flex flex-col gap-16'>
            {projects.map((project) => (
              <Project key={project.slug} project={project} />
            ))}
            <Button
              href={routes.projects.path}
              variant='secondary'
              className='group w-full'
            >
              View all projects{' '}
              <ArrowRightIcon className='h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50' />
            </Button>
          </div>
          <div className='space-y-10 lg:pl-16 xl:pl-24'>
            {/* Resume / Work History */}
            <InfoBlock
              icon={<BriefcaseIcon className='h-6 w-6 flex-none' />}
              title='Work'
              cta={
                <Button href='#' variant='secondary' className='group mt-6 w-full'>
                  Download CV
                  <ArrowDownIcon className='h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50' />
                </Button>
              }
            >
              {resume.map((role, roleIndex) => (
                <Role key={roleIndex} role={role} />
              ))}
            </InfoBlock>

            {/* Education */}
            <InfoBlock
              title='Education'
              icon={<SchoolIcon className='h-6 w-6 flex-none' />}
            >
              {roles.map((role, roleIndex) => (
                <Role key={roleIndex} role={role} />
              ))}
            </InfoBlock>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home
