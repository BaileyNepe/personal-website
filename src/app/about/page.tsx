import type { Metadata } from 'next'
import Image from 'next/image'

import { Container } from '@/components/Container'

import { SocialLinks } from '@/components/SocialLink'
import portraitImage from '@/images/profile.webp'

export const metadata: Metadata = {
  title: 'About',
  description:
    "I'm Bailey Nepe. I live in Morrinsville, and I love building software that improves people's lives."
}

export default function About() {
  return (
    <Container className='mt-16 sm:mt-24'>
      <div className='grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12'>
        <div className='lg:pl-20'>
          <div className='max-w-xs px-2.5 lg:max-w-none'>
            <Image
              src={portraitImage}
              alt=''
              sizes='(min-width: 1024px) 32rem, 20rem'
              className='aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800'
            />
          </div>
        </div>
        <div className='lg:order-first lg:row-span-2'>
          <h1 className='text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100'>
            👋 I'm Bailey Nepe. I build scalable reliable software.
          </h1>
          <div className='mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400'>
            <p>
              My journey into technology started from an unexpected place – the aviation
              industry. After completing my Level 6 Diploma in Aviation at Waikato
              Aviation, I spent several years as a flight instructor, eventually becoming
              Deputy Chief Flying Instructor. Those years taught me precision, attention
              to detail, and the importance of clear communication – skills that translate
              surprisingly well to software development.
            </p>
            <p>
              The transition from aviation to tech wasn't immediate. I discovered my
              passion for programming while looking for ways to solve operational
              challenges in the flight training environment. What started as automating
              simple tasks grew into a fascination with building comprehensive digital
              solutions.
            </p>
            <p>
              I completed my Level 6 Diploma in Software Development at Developers
              Institute, graduating with distinction. This formal education, combined with
              my aviation background, gave me a unique perspective on building reliable,
              user-focused applications where failure isn't an option.
            </p>
            <p>
              Today, I work as a Software Engineer at NumberWorks'nWords, where I develop
              educational technology solutions that help thousands of students across
              Australia and New Zealand. I'm also actively developing Pilot Prep, an
              advanced aviation training platform that combines my two worlds – bringing
              modern educational technology to pilot training.
            </p>
            <p>
              Whether I'm building multi-tenant platforms with AI integration or crafting
              business management systems, I focus on creating scalable, user-centric
              solutions that solve real problems. My aviation background reminds me that
              great software, like great flying, requires careful planning, attention to
              detail, and a commitment to continuous improvement.
            </p>
          </div>
        </div>
        <div className='lg:pl-20'>
          <SocialLinks orientation='vertical' isLabelVisible />
        </div>
      </div>
    </Container>
  )
}
