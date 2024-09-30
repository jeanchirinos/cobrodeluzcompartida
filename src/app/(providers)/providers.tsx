'use client'

import { NextThemesProvider } from './NextThemesProvider'
import { NextUIProvider } from './NextUIProvider'
import { SwrProvider } from './SwrProvider'
import { TanStackQueryProvider } from './TanStackQueryProvider'

export function Providers(props: Required<React.PropsWithChildren>) {
  return (
    <TanStackQueryProvider>
      <SwrProvider>
        <NextUIProvider>
          <NextThemesProvider>{props.children}</NextThemesProvider>
        </NextUIProvider>
      </SwrProvider>
    </TanStackQueryProvider>
  )
}
