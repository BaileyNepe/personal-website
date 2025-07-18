import { socialLinks } from '@/utils/routes'
import clsx from 'clsx'
import Link from 'next/link'

export const SocialLink = ({
  icon: Icon,
  label,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
  label?: string
}) => {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
      {label && <span className="text-sm">{label}</span>}
    </Link>
  )
}

export const SocialLinks = ({
  hasText = false,
  orientation = 'horizontal',
}: {
  hasText?: boolean
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
          label={hasText ? link.label : undefined}
        />
      ))}
    </div>
  )
}
