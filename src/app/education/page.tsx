import type { Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '../../lib/formatDate'
import { type Education, getAllEducation, type WithSlug } from '../../lib/slugImports'

const EducationCard = ({ education }: { education: WithSlug<Education> }) => {
  const endDate = education.endDate || 'Present'
  const isCurrentStudy = !education.endDate

  return (
    <article className='group relative'>
      <div className='absolute left-6 top-6 h-full w-px bg-zinc-200 dark:bg-zinc-700 max-sm:left-5' />
      <div className='relative flex gap-4 sm:gap-6'>
        <div className='relative flex-none'>
          <div className='flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700'>
            <Image
              src={education.logo}
              alt={`${education.institution} logo`}
              className='h-6 w-6 sm:h-8 sm:w-8 rounded-full object-contain'
              width={32}
              height={32}
              unoptimized
            />
          </div>
          {isCurrentStudy && (
            <div className='absolute -top-1 -right-1 h-3 w-3 rounded-full bg-blue-500 ring-2 ring-white dark:ring-zinc-900'>
              <div className='h-full w-full animate-ping rounded-full bg-blue-400 opacity-75' />
            </div>
          )}
        </div>

        <div className='min-w-0 flex-auto pb-8 sm:pb-12'>
          <Card className='!p-0'>
            <div className='flex flex-col gap-3 sm:gap-4'>
              <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2'>
                <div className='flex-1 min-w-0 pr-4'>
                  <Card.Title
                    href={`/education/${education.slug}`}
                    className='text-lg font-semibold'
                  >
                    {education.institution}
                  </Card.Title>
                  {education.location && (
                    <p className='text-sm text-zinc-500 dark:text-zinc-400'>
                      {education.location}
                    </p>
                  )}
                </div>
                <div className='flex-shrink-0 min-w-fit'>
                  <time className='text-sm font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap'>
                    {formatDate(education.startDate)} —{' '}
                    {typeof endDate === 'string' && endDate !== 'Present'
                      ? formatDate(endDate)
                      : endDate}
                  </time>
                </div>
              </div>

              <div className='border-l-2 border-zinc-100 pl-4 dark:border-zinc-800'>
                <h3 className='font-medium text-zinc-900 dark:text-zinc-100 mb-2'>
                  {education.qualification}
                </h3>
                {education.description && (
                  <div className='max-w-2xl'>
                    <Card.Description>{education.description}</Card.Description>
                  </div>
                )}
              </div>

              {education.achievements && education.achievements.length > 0 && (
                <div className='rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50'>
                  <h4 className='text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2'>
                    Key Achievements
                  </h4>
                  <ul className='space-y-1'>
                    {education.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className='text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2'
                      >
                        <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-400 flex-shrink-0' />
                        {achievement}
                      </li>
                    ))}
                  </ul>
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
  title: 'Education',
  description: 'My educational background and academic achievements.'
}

export default async function EducationPage() {
  const education = await getAllEducation()

  return (
    <SimpleLayout
      title='Education'
      intro='My educational journey and formal qualifications that have shaped my professional development and expertise.'
    >
      <div className='space-y-8'>
        {education.map((educationItem) => (
          <EducationCard key={educationItem.slug} education={educationItem} />
        ))}
      </div>
    </SimpleLayout>
  )
}
