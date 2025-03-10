'use client'

import { NextThemesProvider } from './NextThemesProvider'
import { HeroUIProvider } from './HeroUIProvider'
import { TanStackQueryProvider } from './TanStackQueryProvider'

export function Providers(props: Required<React.PropsWithChildren>) {
  return (
    <TanStackQueryProvider>
      <HeroUIProvider>
        <NextThemesProvider>{props.children}</NextThemesProvider>
      </HeroUIProvider>
    </TanStackQueryProvider>
  )
}
