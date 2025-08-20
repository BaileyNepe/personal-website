'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { CloseIcon } from '@/components/Icons/CloseIcon'

interface TechData {
  name: string
  slug: string
  icon?: string
  description: string
  websiteUrl: string
  codeSnippet: string
  codeLanguage: string
}

interface TechModalProps {
  isOpen: boolean
  onClose: () => void
  techData: TechData | null
}

export const TechModal = ({ isOpen, onClose, techData }: TechModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !techData) return null

  const getIconSrc = () => {
    return (
      techData.icon ?? `https://cdn.simpleicons.org/${techData.slug}/${techData.slug}`
    )
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200'>
      {/* Backdrop */}
      <button
        className='absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200'
        onClick={onClose}
        type='button'
        aria-label='Close modal'
      />

      {/* Modal */}
      <div className='relative z-10 w-full max-w-2xl mx-4 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-200'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-700'>
          <div className='flex items-center gap-4'>
            <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800'>
              <Image
                src={getIconSrc()}
                alt={`${techData.name} icon`}
                width={24}
                height={24}
                className='h-6 w-6'
                unoptimized
              />
            </div>
            <h2 className='text-2xl font-bold text-zinc-900 dark:text-zinc-100'>
              {techData.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className='rounded-full p-2 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-colors'
            aria-label='Close modal'
            type='button'
          >
            <CloseIcon className='h-5 w-5' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          {/* Description */}
          <div>
            <h3 className='text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3'>
              How I've used it
            </h3>
            <p className='text-zinc-700 dark:text-zinc-300 leading-relaxed'>
              {techData.description}
            </p>
          </div>

          {/* Code Snippet */}
          <div>
            <h3 className='text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3'>
              Code Example
            </h3>
            <div className='relative'>
              <pre className='bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 overflow-x-auto border border-zinc-200 dark:border-zinc-700'>
                <code
                  className={`language-${techData.codeLanguage} text-sm text-zinc-800 dark:text-zinc-200 font-mono leading-relaxed`}
                >
                  {techData.codeSnippet}
                </code>
              </pre>
            </div>
          </div>

          {/* Website Link */}
          <div className='pt-2'>
            <a
              href={techData.websiteUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-all duration-200 font-medium hover:shadow-lg hover:scale-105 active:scale-95'
            >
              Visit Official Website
              <svg
                className='h-4 w-4 transition-transform group-hover:translate-x-0.5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
