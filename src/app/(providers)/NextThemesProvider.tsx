'use client'

import { type PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'

export function NextThemesProvider(props: Required<PropsWithChildren>) {
  return <ThemeProvider {...props} attribute='class' />
}
