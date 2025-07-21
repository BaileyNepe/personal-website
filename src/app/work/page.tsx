import type { Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

import { formatDate } from '../../lib/formatDate'
import { getAllWork, type WithSlug, type Work } from '../../lib/slugImports'

const ProjectCard = ({ project }: { project: WithSlug<Work> }) => {
  return (
    <article className='md:grid md:grid-cols-4 md:items-baseline'>
      <Card className='md:col-span-3'>
        <Card.Title href={`/projects/${project.slug}`}>{project.company}</Card.Title>
        <Card.Eyebrow as='time' dateTime={project.startDate} className='md:hidden' decorate>
          {formatDate(project.startDate)}
        </Card.Eyebrow>
        <Card.Description>{project.title}</Card.Description>
        <Card.Cta>View project</Card.Cta>
      </Card>
      <Card.Eyebrow as='time' dateTime={project.startDate} className='mt-1 max-md:hidden'>
        {formatDate(project.startDate)}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I’ve made trying to put my dent in the universe.'
}

export default async function Projects() {
  const work = await getAllWork()

  return (
    <SimpleLayout
      title='Projects'
      intro='All of my projects, collected in chronological order.'
    >
      <div className='md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40'>
        <div className='flex max-w-3xl flex-col space-y-16'>
          {work.map((work) => (
            <ProjectCard key={work.slug} project={work} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
