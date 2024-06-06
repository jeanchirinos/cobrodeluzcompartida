'use client'

import { type PropsWithChildren } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { SwrProvider } from './SwrProvider'
import { NextThemesProvider } from './NextThemesProvider'

export function Providers(props: Required<PropsWithChildren>) {
  return (
    <SwrProvider>
      <NextUIProvider>
        <NextThemesProvider>{props.children}</NextThemesProvider>
      </NextUIProvider>
    </SwrProvider>
  )
}
