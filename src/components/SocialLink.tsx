import { socialLinks } from '@/utils/routes'
import clsx from 'clsx'
import Link from 'next/link'

export const SocialLink = ({
  icon: Icon,
  label,
  isLabelVisible = false,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
  label: string
  isLabelVisible?: boolean
}) => {
  return (
    <Link
      className={clsx(
        'group -m-1 flex items-center gap-2 p-1 transition',
        isLabelVisible
          ? 'hover:text-teal-500 dark:hover:text-teal-500'
          : 'group-hover:fill-zinc-600 dark:group-hover:fill-zinc-600',
      )}
      {...props}
    >
      <Icon
        className={clsx(
          'h-6 w-6 fill-zinc-500 transition dark:fill-zinc-400',
          label === 'Email' && 'fill-zinc-50 stroke-zinc-500',
        )}
      />
      {isLabelVisible && <span className="text-sm">{label}</span>}
    </Link>
  )
}

export const SocialLinks = ({
  isLabelVisible = false,
  orientation = 'horizontal',
}: {
  isLabelVisible?: boolean
  orientation?: 'horizontal' | 'vertical'
}) => {
  return (
    <div className={clsx('flex gap-4', orientation === 'vertical' && 'flex-col')}>
      {Object.values(socialLinks).map((link) => (
        <SocialLink
          key={link.path}
          href={link.path}
          icon={link.icon}
          aria-label={link.label}
          label={link.label}
          isLabelVisible={isLabelVisible}
        />
      ))}
    </div>
  )
}
