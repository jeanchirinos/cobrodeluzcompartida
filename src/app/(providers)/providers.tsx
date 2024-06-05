'use client'
import { type PropsWithChildren } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { SwrProvider } from './SwrProvider'
import { NextThemesProvider } from './NextThemesProvider'

type Props = Required<PropsWithChildren>

export function Providers(props: Props) {
  return (
    <SwrProvider>
      <NextUIProvider>
        <NextThemesProvider>{props.children}</NextThemesProvider>
      </NextUIProvider>
    </SwrProvider>
  )
}
