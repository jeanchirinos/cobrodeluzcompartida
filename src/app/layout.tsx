import { type PropsWithChildren } from 'react'
import '../globals.css'
import { Providers } from './(providers)/providers'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from '@/components/other/CustomToaster'
import { ProgressBar } from '@/components/other/ProgressBar'
import { font } from './font'

export { metadata } from './metadata'

export default function RootLayout(props: Required<PropsWithChildren>) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={font.className}>
        <Providers>
          {props.children}
          <ProgressBar />
          <Toaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
