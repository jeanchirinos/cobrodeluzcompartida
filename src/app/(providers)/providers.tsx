'use client'

import { SwrProvider } from './SwrProvider'
import { NextThemesProvider } from './NextThemesProvider'
import { NextUIProvider } from './NextUIProvider'

export function Providers(props: Required<React.PropsWithChildren>) {
  return (
    <SwrProvider>
      <NextUIProvider>
        <NextThemesProvider>{props.children}</NextThemesProvider>
      </NextUIProvider>
    </SwrProvider>
  )
}
