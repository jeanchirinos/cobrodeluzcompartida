'use client'

import { NextThemesProvider } from './NextThemesProvider'
import { NextUIProvider } from './NextUIProvider'
import { SwrProvider } from './SwrProvider'

export function Providers(props: Required<React.PropsWithChildren>) {
  return (
    <SwrProvider>
      <NextUIProvider>
        <NextThemesProvider>{props.children}</NextThemesProvider>
      </NextUIProvider>
    </SwrProvider>
  )
}
