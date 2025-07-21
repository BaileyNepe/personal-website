import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '../../lib/formatDate'
import { getAllWork, type WithSlug, type Work } from '../../lib/slugImports'

const WorkCard = ({ work }: { work: WithSlug<Work> }) => {
  // If work has roles, use them; otherwise create a single role from the main data
  const roles =
    work.roles && work.roles.length > 0
      ? [...work.roles].reverse() // Most recent first
      : [
          {
            title: 'Position',
            startDate: work.startDate,
            endDate: work.endDate,
            description: work.description
          }
        ]

  const overallStartDate = work.startDate
  const overallEndDate = work.endDate || 'Present'
  const isCurrentRole = !work.endDate

  return (
    <article className='group relative'>
      <div className='absolute left-0 top-6 h-full w-px bg-zinc-200 dark:bg-zinc-700' />
      <div className='relative flex gap-6'>
        <div className='relative flex-none'>
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700'>
            <Image
              src={work.logo}
              alt={`${work.company} logo`}
              className='h-8 w-8 rounded-full object-contain'
              width={32}
              height={32}
              unoptimized
            />
          </div>
          {isCurrentRole && (
            <div className='absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900'>
              <div className='h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
            </div>
          )}
        </div>

        <div className='min-w-0 flex-auto pb-12'>
          <Card className='!p-0'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2'>
                <div>
                  <Card.Title
                    href={`/work/${work.slug}`}
                    className='text-lg font-semibold'
                  >
                    {work.company}
                  </Card.Title>
                  {work.location && (
                    <p className='text-sm text-zinc-500 dark:text-zinc-400'>
                      {work.location}
                    </p>
                  )}
                </div>
                <div className='flex flex-col items-start sm:items-end gap-1'>
                  <time className='text-sm font-medium text-zinc-600 dark:text-zinc-400'>
                    {formatDate(overallStartDate)} —{' '}
                    {typeof overallEndDate === 'string' && overallEndDate !== 'Present'
                      ? formatDate(overallEndDate)
                      : overallEndDate}
                  </time>
                  {work.type && (
                    <span className='inline-flex items-center rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'>
                      {work.type.charAt(0).toUpperCase() +
                        work.type.slice(1).replace('-', ' ')}
                    </span>
                  )}
                </div>
              </div>

              <div className='space-y-4'>
                {roles.map((role) => (
                  <div
                    key={`${role.title}-${role.startDate}`}
                    className='border-l-2 border-zinc-100 pl-4 dark:border-zinc-800'
                  >
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1'>
                      <h3 className='font-medium text-zinc-900 dark:text-zinc-100'>
                        {role.title}
                      </h3>
                      {roles.length > 1 && (
                        <time className='text-sm text-zinc-500 dark:text-zinc-400'>
                          {formatDate(role.startDate)} —{' '}
                          {role.endDate ? formatDate(role.endDate) : 'Present'}
                        </time>
                      )}
                    </div>
                    {role.description && (
                      <div className='mt-1'>
                        <Card.Description>{role.description}</Card.Description>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!roles.some((role) => role.description) && work.description && (
                <Card.Description>{work.description}</Card.Description>
              )}

              <Card.Cta>View details</Card.Cta>
            </div>
          </Card>
        </div>
      </div>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Work',
  description: 'My professional journey and career progression.'
}

export default async function WorkPage() {
  const work = await getAllWork()

  return (
    <SimpleLayout
      title='Work Experience'
      intro='My professional journey through different roles and companies, showcasing growth and diverse experiences in technology and aviation.'
    >
      <div className='space-y-8'>
        {work.map((workItem) => (
          <WorkCard key={workItem.slug} work={workItem} />
        ))}
      </div>
    </SimpleLayout>
  )
}
