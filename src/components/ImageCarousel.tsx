/** biome-ignore-all lint/suspicious/noArrayIndexKey: we need to use the index as the key */
'use client'

import clsx from 'clsx'
import Image, { type StaticImageData } from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { ChevronLeftIcon } from './Icons/ChevronLeftIcon'
import { ChevronRightIcon } from './Icons/ChevronRightIcon'

export interface ImageCarouselProps {
  images: (StaticImageData | string)[]
  alt?: string
  autoSlideInterval?: number
  className?: string
  showDots?: boolean
  showArrows?: boolean
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto'
}

export function ImageCarousel({
  images,
  alt = 'Carousel image',
  autoSlideInterval = 4000,
  className,
  showDots = true,
  showArrows = true,
  aspectRatio = 'auto'
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered && autoSlideInterval > 0) {
      const interval = setInterval(nextSlide, autoSlideInterval)
      return () => clearInterval(interval)
    }
  }, [nextSlide, autoSlideInterval, isHovered])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'ArrowRight') {
        nextSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[16/9]',
    auto: ''
  }

  if (images.length === 0) {
    return null
  }

  return (
    <section
      className={clsx(
        'relative w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800',
        aspectRatioClasses[aspectRatio],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label='Image carousel'
    >
      {/* Images Container */}
      <div
        className='flex h-full w-full transition-transform duration-500 ease-in-out'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={`carousel-image-${index}`}
            className='relative h-full w-full flex-shrink-0'
          >
            <Image
              src={image}
              alt={`${alt} ${index + 1}`}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw'
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && images.length > 1 && (
        <>
          <button
            type='button'
            onClick={prevSlide}
            className='absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-opacity hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white'
            aria-label='Previous image'
          >
            <ChevronLeftIcon className='h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-200 dark:group-hover:stroke-zinc-300 cursor-pointer' />
          </button>
          <button
            type='button'
            onClick={nextSlide}
            className='absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-opacity hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white'
            aria-label='Next image'
          >
            <ChevronRightIcon className='h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-200 dark:group-hover:stroke-zinc-300 cursor-pointer' />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && images.length > 1 && (
        <div className='absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2'>
          {images.map((_, index) => (
            <button
              type='button'
              key={`carousel-dot-${index}`}
              onClick={() => goToSlide(index)}
              className={clsx(
                'h-2 w-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2',
                currentIndex === index
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className='absolute top-4 right-4 z-10 rounded-full bg-black/50 px-3 py-1 text-sm text-white'>
        {currentIndex + 1} / {images.length}
      </div>
    </section>
  )
}
