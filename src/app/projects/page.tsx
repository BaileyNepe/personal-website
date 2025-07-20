import type { Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllProjects, type Project, type WithSlug } from '@/lib/slugImports'

const Project = ({ project }: { project: WithSlug<Project> }) => {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/projects/${project.slug}`}>{project.title}</Card.Title>
        <Card.Eyebrow as="time" dateTime={project.date} className="md:hidden" decorate>
          {formatDate(project.date)}
        </Card.Eyebrow>
        <Card.Description>{project.description}</Card.Description>
        <Card.Cta>View project</Card.Cta>
      </Card>
      <Card.Eyebrow as="time" dateTime={project.date} className="mt-1 max-md:hidden">
        {formatDate(project.date)}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Projects',
  description: 'All of my projects, collected in chronological order.',
}

export default async function ProjectsIndex() {
  const projects = await getAllProjects()

  return (
    <SimpleLayout
      title="Projects"
      intro="All of my projects, collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {projects.map((project) => (
            <Project key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
