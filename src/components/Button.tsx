import clsx from 'clsx'
import Link from 'next/link'

const variantStyles = {
  primary:
    'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
  secondary:
    'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70'
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
} & (
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
)

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  className = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className
  )

  if (typeof props.href === 'undefined') {
    return <button className={className} {...props} />
  }

  // Check if it's an external link or file download
  const href = typeof props.href === 'string' ? props.href : props.href.toString()
  const isExternal =
    href.startsWith('http') ||
    (href.startsWith('/') && (href.includes('.pdf') || 'target' in props))

  if (isExternal) {
    const { href: _hrefProp, ...anchorProps } = props
    return <a className={className} href={href} {...anchorProps} />
  }

  return <Link className={className} {...props} />
}
