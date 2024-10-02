'use client'

import { NextThemesProvider } from './NextThemesProvider'
import { NextUIProvider } from './NextUIProvider'
import { TanStackQueryProvider } from './TanStackQueryProvider'

export function Providers(props: Required<React.PropsWithChildren>) {
  return (
    <TanStackQueryProvider>
      <NextUIProvider>
        <NextThemesProvider>{props.children}</NextThemesProvider>
      </NextUIProvider>
    </TanStackQueryProvider>
  )
}
