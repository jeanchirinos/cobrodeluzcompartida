'use client'

import { NextThemesProvider } from './NextThemesProvider'
import { NextUIProvider } from './NextUIProvider'

export function Providers(props: Required<React.PropsWithChildren>) {
  return (
    <NextUIProvider>
      <NextThemesProvider>{props.children}</NextThemesProvider>
    </NextUIProvider>
  )
}
