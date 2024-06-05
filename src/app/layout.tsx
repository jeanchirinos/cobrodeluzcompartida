import { type Metadata } from 'next'
import { type PropsWithChildren } from 'react'
import '../globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './(providers)/providers'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from '@/components/other/CustomToaster'
import { ProgressBar } from '@/components/other/ProgressBar'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CCSEC',
  description: 'Calcula el monto a pagar por el consumo de energía eléctrica de tus inquilinos.',
}

type Props = Required<PropsWithChildren>

export default function RootLayout(props: Props) {
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
