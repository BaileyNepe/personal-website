import type { Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://baileynepe.com'),
  title: {
    template: '%s - Bailey Nepe',
    default: 'Bailey Nepe - Full-Stack Solutions Engineer'
  },
  description:
    'Full-Stack Solutions Engineer who architects end-to-end technical solutions that drive business impact. Specialising in React, Node.js, TypeScript, and AWS to build scalable, high-performance systems.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`
    }
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='h-full antialiased' suppressHydrationWarning>
      <body className='flex h-full bg-zinc-50 dark:bg-black'>
        <Providers>
          <div className='flex w-full'>
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
