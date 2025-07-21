import type { Metadata } from 'next'
import Image from 'next/image'

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
      <div className='absolute left-6 top-6 h-full w-px bg-zinc-200 dark:bg-zinc-700 max-sm:left-5' />
      <div className='relative flex gap-4 sm:gap-6'>
        <div className='relative flex-none'>
          <div className='flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700'>
            <Image
              src={work.logo}
              alt={`${work.company} logo`}
              className='h-6 w-6 sm:h-8 sm:w-8 rounded-full object-contain'
              width={32}
              height={32}
              unoptimized
            />
          </div>
          {isCurrentRole && (
            <div className='absolute -top-0 -right-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900'>
              <div className='h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
            </div>
          )}
        </div>

        <div className='min-w-0 flex-auto pb-8 sm:pb-12'>
          <Card className='p-0'>
            <div className='flex flex-col gap-3 sm:gap-4'>
              <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2'>
                <div className='flex-1 min-w-0 pr-4'>
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
                <div className='flex-shrink-0'>
                  <time className='text-sm font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap'>
                    {formatDate(overallStartDate)} —{' '}
                    {typeof overallEndDate === 'string' && overallEndDate !== 'Present'
                      ? formatDate(overallEndDate)
                      : overallEndDate}
                  </time>
                </div>
              </div>

              <div className='space-y-4 w-full'>
                {roles.map((role) => (
                  <div
                    key={`${role.title}-${role.startDate}`}
                    className='border-l-2 border-zinc-100 pl-4 dark:border-zinc-800 w-full'
                  >
                    <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2 w-full'>
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-medium text-zinc-900 dark:text-zinc-100'>
                          {role.title}
                        </h3>
                      </div>
                      {roles.length > 1 && (
                        <div className='flex-shrink-0 min-w-fit ml-4'>
                          <time className='text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap'>
                            {formatDate(role.startDate)} —{' '}
                            {role.endDate ? formatDate(role.endDate) : 'Present'}
                          </time>
                        </div>
                      )}
                    </div>
                    {role.description && (
                      <div className='max-w-2xl'>
                        <Card.Description>{role.description}</Card.Description>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!roles.some((role) => role.description) && work.description && (
                <div className='max-w-2xl'>
                  <Card.Description>{work.description}</Card.Description>
                </div>
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
