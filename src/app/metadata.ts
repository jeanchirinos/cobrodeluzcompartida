import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | CLC',
    default: 'CLC',
  },
  description: 'Calcula el monto a pagar por el consumo de energía eléctrica de tus inquilinos.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ''),
  openGraph: {
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
  icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/img/favicon.svg' }],
}
