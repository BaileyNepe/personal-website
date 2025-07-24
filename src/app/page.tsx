import Image from 'next/image'
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
import { TechStack } from '@/components/TechStack'
import avatarImage from '@/images/avatar.webp'
import {
  type Education,
  getAllEducation,
  getAllProjects,
  getAllWork,
  type Project,
  type WithSlug,
  type Work
} from '@/lib/slugImports'
import { routes } from '@/utils/routes'
import { formatDateYear } from '../lib/formatDate'

const ProjectCard = ({ project }: { project: WithSlug<Project> }) => {
  return (
    <Card as='article'>
      {project.image && (
        <div className='relative z-10 mb-4 aspect-video w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800'>
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
            sizes='(min-width: 1024px) 50vw, 100vw'
          />
        </div>
      )}

      <div className='flex items-start justify-between gap-2 mb-2'>
        <Card.Title href={`/projects/${project.slug}`}>{project.title}</Card.Title>
        {project.status === 'in-progress' && (
          <span className='inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'>
            <span className='mr-1 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse'></span>
            Active
          </span>
        )}
      </div>

      <Card.Description>{project.description}</Card.Description>
      {project.tags && project.tags.length > 0 && (
        <div className='relative z-10 mt-2 flex flex-wrap gap-1'>
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className='inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className='inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500'>
              +{project.tags.length - 3} more
            </span>
          )}
        </div>
      )}
      <Card.Cta>View project</Card.Cta>
    </Card>
  )
}

const WorkCard = ({ work }: { work: WithSlug<Work> }) => {
  const startLabel = formatDateYear(work.startDate)
  const startDate = formatDateYear(work.startDate)

  const endLabel = work.endDate ? formatDateYear(work.endDate) : 'Present'
  const endDate = work.endDate
    ? formatDateYear(work.endDate)
    : new Date().getFullYear().toString()

  return (
    <Link href={`${routes.work.path}/${work.slug}`} className='block'>
      <li className='group flex cursor-pointer gap-4'>
        <div className='relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0'>
          <Image
            src={work.logo}
            alt=''
            className='h-7 w-7 rounded-full object-contain object-center'
            unoptimized
          />
        </div>
        <dl className='flex flex-auto flex-wrap gap-x-2'>
          <dt className='sr-only'>Company</dt>
          <dd className='flex flex-none items-center gap-2 text-sm font-medium text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300'>
            {work.company}
            <ChevronRightIcon className='h-4 w-4 translate-x-[-8px] stroke-zinc-400 font-bold opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:stroke-zinc-500' />
          </dd>
          <dt className='sr-only'>Date</dt>
          <dd className='ml-auto text-xs text-zinc-400 dark:text-zinc-500'>
            <time dateTime={startDate}>{startLabel}</time>{' '}
            <span aria-hidden='true'>—</span> <time dateTime={endDate}>{endLabel}</time>
          </dd>
          <dt className='sr-only'>Role</dt>
          <dd className='w-full text-xs text-zinc-500 dark:text-zinc-400'>
            {work.roles?.at(-1)?.title}
          </dd>
        </dl>
      </li>
    </Link>
  )
}

const EducationCard = ({ education }: { education: WithSlug<Education> }) => {
  const startLabel = formatDateYear(education.startDate)
  const startDate = formatDateYear(education.startDate)

  const endLabel = education.endDate ? formatDateYear(education.endDate) : 'Present'
  const endDate = education.endDate
    ? formatDateYear(education.endDate)
    : new Date().getFullYear().toString()

  return (
    <Link href={`${routes.education.path}/${education.slug}`} className='block'>
      <li className='group flex cursor-pointer gap-4'>
        <div className='relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0'>
          <Image
            src={education.logo}
            alt=''
            className='h-7 w-7 rounded-full object-contain object-center'
            unoptimized
          />
        </div>
        <dl className='flex flex-auto flex-wrap gap-x-2'>
          <dt className='sr-only'>Institution</dt>
          <dd className='flex flex-none items-center gap-2 text-sm font-medium text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300'>
            {education.institution}
            <ChevronRightIcon className='h-4 w-4 translate-x-[-8px] stroke-zinc-400 font-bold opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:stroke-zinc-500' />
          </dd>
          <dt className='sr-only'>Date</dt>
          <dd className='ml-auto text-xs text-zinc-400 dark:text-zinc-500'>
            <time dateTime={startDate}>{startLabel}</time>{' '}
            <span aria-hidden='true'>—</span> <time dateTime={endDate}>{endLabel}</time>
          </dd>
          <dt className='sr-only'>Qualification</dt>
          <dd className='w-full text-xs text-zinc-500 dark:text-zinc-400'>
            {education.qualification}
          </dd>
        </dl>
      </li>
    </Link>
  )
}

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
  const work = await getAllWork()
  const education = await getAllEducation()
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
                Full-Stack Solutions Engineer
              </h1>
              <p className='mt-6 text-base text-zinc-600 dark:text-zinc-400'>
                Hi, I&apos;m Bailey 👋. I architect end-to-end technical solutions that
                solve real business problems. From transforming critical infrastructure to
                optimising performance from seconds to milliseconds, I build scalable,
                reliable systems using React, Node.js, TypeScript, and AWS. I specialise
                in identifying inefficiencies and delivering comprehensive solutions that
                drive measurable business impact.
              </p>
              <div className='mt-6 flex justify-center gap-6'>
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className='mt-16'>
        <TechStack />
      </div>

      <Container className='mt-16 md:mt-20'>
        <div className='mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2'>
          <div className='flex flex-col gap-16'>
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
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
              {work.map((work) => (
                <WorkCard
                  key={`${work.company}-${work.roles?.at(-1)?.title}`}
                  work={work}
                />
              ))}
            </InfoBlock>

            {/* Education */}
            <InfoBlock
              title='Education'
              icon={<SchoolIcon className='h-6 w-6 flex-none' />}
            >
              {education.map((education) => (
                <EducationCard
                  key={`${education.institution}-${education.qualification}`}
                  education={education}
                />
              ))}
            </InfoBlock>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home
