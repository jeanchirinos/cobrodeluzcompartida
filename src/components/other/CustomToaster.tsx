'use client'

import { useTheme } from 'next-themes'
import { ComponentProps } from 'react'
import { Toaster as SonnerToaster } from 'sonner'

export function Toaster() {
  const { theme } = useTheme() as { theme: ComponentProps<typeof SonnerToaster>['theme'] }

  return (
    <SonnerToaster
      richColors
      position='top-center'
      theme={theme}
      className='!left-0 right-0 !w-[calc(100%-16px)] !transform-none'
      toastOptions={{
        classNames: {
          toast: '!w-max !max-w-[min(400px,95%)] !left-1/2 [translate:-50%]',
        },
      }}
    />
  )
}
