import clsx from 'clsx'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllProjects, type Project, type WithSlug } from '@/lib/slugImports'

const StatusBadge = ({ status, priority }: { status?: string; priority?: string }) => {
  if (status === 'in-progress') {
    return (
      <span className='inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'>
        <span className='mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse'></span>
        In Progress
      </span>
    )
  }

  if (status === 'completed') {
    const priorityStyles = {
      high: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
      medium: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
      low: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
    }

    return (
      <span
        className={clsx(
          'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
          priorityStyles[priority as keyof typeof priorityStyles] || priorityStyles.medium
        )}
      >
        {priority === 'high' ? 'Iterative' : 'Completed'}
      </span>
    )
  }

  return null
}

const ProjectCard = ({ project }: { project: WithSlug<Project> }) => {
  const isHighPriority = project.priority === 'high' || project.status === 'in-progress'

  return (
    <Card as='li'>
      {project.image && (
        <div className='relative z-10 mb-6 aspect-video w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800'>
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
            sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
          />
        </div>
      )}

      <div className='flex items-start justify-between gap-2 mb-2'>
        <h2
          className={`font-semibold text-zinc-800 dark:text-zinc-100 ${isHighPriority ? 'text-lg' : 'text-base'}`}
        >
          <Card.Link href={`/projects/${project.slug}`}>{project.title}</Card.Link>
        </h2>
        <StatusBadge status={project.status} priority={project.priority} />
      </div>

      <Card.Description>{project.description}</Card.Description>

      {project.completedDate && project.status === 'completed' && (
        <p className='relative z-10 mt-2 text-xs text-zinc-500 dark:text-zinc-400'>
          Completed{' '}
          {new Date(project.completedDate).toLocaleDateString('en-NZ', {
            year: 'numeric',
            month: 'long'
          })}
        </p>
      )}

      {project.tags && project.tags.length > 0 && (
        <div className='relative z-10 mt-4 flex flex-wrap gap-1'>
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

export const metadata: Metadata = {
  title: 'Projects',
  description: ''
}

export default async function ProjectsIndex() {
  const projects = await getAllProjects()

  return (
    <SimpleLayout
      title="Things I've made"
      intro="I work on projects that I'm passionate about with people who are passionate about them too. I prefer to work on real projects that have an impact on people's lives."
    >
      <ul className='grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3'>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </SimpleLayout>
  )
}
