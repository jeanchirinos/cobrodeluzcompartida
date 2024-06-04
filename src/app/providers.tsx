'use client'
import { NextUIProvider } from '@nextui-org/react'
import { AppProgressBar } from 'next-nprogress-bar'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/other/CustomToaster'
import { SWRConfig } from 'swr'

export function Providers(props: React.PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
      }}
    >
      <NextUIProvider>
        <ThemeProvider attribute='class'>
          {props.children}
          <AppProgressBar
            height='1.5px'
            color='hsl(var(--nextui-primary))'
            options={{ showSpinner: false }}
            shallowRouting
          />
          <Toaster />
        </ThemeProvider>
      </NextUIProvider>
    </SWRConfig>
  )
}
