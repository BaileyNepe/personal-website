import type { Metadata } from 'next'
import Image from 'next/image'

import { Container } from '@/components/Container'

import { SocialLinks } from '@/components/SocialLink'
import portraitImage from '@/images/profile.webp'

export const metadata: Metadata = {
  title: 'About',
  description:
    "I'm Bailey Nepe, a Full-Stack Solutions Engineer who architects end-to-end technical solutions that drive business impact. Specialising in scalable, high-performance systems."
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
            👋 I'm Bailey Nepe. I architect solutions that drive business impact.
          </h1>
          <div className='mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400'>
            <p>
              My journey into technology began with a unique background in aviation, where
              I advanced to Deputy Chief Flying Instructor after achieving perfect
              academic records in commercial pilot training. This experience instilled a
              systematic approach to problem-solving and an appreciation for building
              reliable, well-architected systems. Transitioning to software engineering, I
              bring the same methodical thinking and attention to detail to crafting
              technical solutions that businesses can depend on.
            </p>
            <p>
              The transition from aviation to tech came during the 2020 COVID-19 lockdown
              when I had time to really examine the inefficiencies plaguing aviation
              training. I watched talented students struggle with outdated PDFs and
              generic learning platforms that completely missed the visual, interactive
              nature of pilot education. Training organisations were stuck with
              one-size-fits-all systems that didn't understand their unique needs. That's
              when I started building pilot-specific online courses and digital materials
              for private tutoring, discovering a passion for creating educational
              technology that actually solved real problems.
            </p>
            <p>
              I completed my Level 6 Diploma in Software Development at Developers
              Institute, achieving A+ grades across all modules while working full-time at
              NumberWorks'nWords – demonstrating exceptional time management and the
              ability to immediately apply classroom learning to real-world challenges.
              This intensive experience, combined with my aviation background, gave me a
              unique perspective on building reliable, user-focused applications where
              failure isn't an option.
            </p>
            <p>
              Today, I work as a Software Engineer at NumberWorks'nWords, where I
              architect solutions for an educational platform serving thousands of
              students across 70+ franchise centres. I led a complete infrastructure
              transformation—migrating from a fragile single EC2 instance to a scalable,
              containerised AWS ECS environment. This resulted in 99.9% uptime, 45-minute
              to 5-minute deployment times, and dashboard performance improvements from
              10+ seconds to 100ms. These technical improvements directly translated to
              better tutor productivity and enhanced student learning experiences.
            </p>
            <p>
              Beyond my full-time role, I develop comprehensive solutions for diverse
              business challenges. Pilot Prep is an advanced multi-tenant aviation LMS
              featuring AI-powered tutoring and white-label capabilities, while Dreams
              Built transformed construction management by eliminating 85% of
              administrative overhead through intelligent timesheet automation and
              real-time job costing. Whether I'm architecting multi-tenant platforms,
              implementing performance optimisations, or building automated deployment
              pipelines, I focus on creating end-to-end solutions that solve real
              problems. My systematic approach ensures that every solution I build is
              scalable, maintainable, and delivers measurable business value.
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
