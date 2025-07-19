import clsx from 'clsx'

interface LineProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Line({ orientation = 'vertical', className }: LineProps) {
  return (
    <div
      className={clsx(
        'bg-zinc-200 dark:bg-zinc-700',
        orientation === 'vertical' ? 'w-px h-6' : 'h-px w-6',
        className
      )}
    />
  )
} 