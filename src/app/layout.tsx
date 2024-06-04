import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Providers } from './providers'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CCSEC',
  description: 'Calcula el monto a pagar por el consumo de energía eléctrica de tus inquilinos.',
}

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{props.children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
