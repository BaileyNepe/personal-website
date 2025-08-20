'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Marquee } from '@/components/magicui/marquee'
import { TechModal } from '@/components/TechModal'
import { type TechData, techStackData } from '@/data/techStackData'
import { cn } from '@/lib/utils'

const TechIcon = ({
  name,
  slug,
  onClick
}: {
  name: string
  slug: string
  onClick: () => void
}) => {
  const getIconSrc = () => {
    const techIcon = techStackData.find((tech) => tech.slug === slug)?.icon
    return techIcon ?? `https://cdn.simpleicons.org/${slug}/${slug}`
  }

  return (
    <button
      className={cn(
        'flex items-center justify-center min-w-fit px-4 group cursor-pointer relative'
      )}
      title={name}
      onClick={onClick}
      type='button'
    >
      <div className='flex h-16 w-16 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md dark:bg-zinc-800 dark:ring-zinc-700'>
        <Image
          src={getIconSrc()}
          alt={`${name} icon`}
          width={32}
          height={32}
          className='h-8 w-8 transition-transform duration-300'
          unoptimized
        />
      </div>
    </button>
  )
}

export const TechStack = () => {
  const [selectedTech, setSelectedTech] = useState<TechData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleTechClick = (slug: string) => {
    const techData = techStackData.find((tech) => tech.slug === slug)
    if (techData) {
      setSelectedTech(techData)
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTech(null)
  }

  return (
    <>
      <div className='sm:px-8'>
        <div className='relative w-full overflow-hidden mx-auto lg:px-8 max-w-7xl'>
          <div className='relative flex items-center min-h-[120px]'>
            <Marquee pauseOnHover className='[--duration:100s]'>
              {techStackData.map((tech) => (
                <TechIcon
                  key={tech.slug}
                  name={tech.name}
                  slug={tech.slug}
                  onClick={() => handleTechClick(tech.slug)}
                />
              ))}
            </Marquee>

            <div className='pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-50 to-transparent dark:from-zinc-800/50 z-10' />
            <div className='pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-50 to-transparent dark:from-zinc-800/50 z-10' />
          </div>
        </div>
      </div>

      <TechModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        techData={selectedTech}
      />
    </>
  )
}
