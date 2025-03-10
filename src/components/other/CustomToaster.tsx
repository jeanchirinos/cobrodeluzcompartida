'use client'

import { useTheme, type UseThemeProps } from 'next-themes'
import { Toaster as SonnerToaster, type ToasterProps } from 'sonner'

export function Toaster() {
  const { theme } = useTheme() as UseThemeProps & Pick<ToasterProps, 'theme'>

  return (
    <SonnerToaster
      theme={theme}
      position='top-center'
      richColors
      className='!left-0 right-0 !w-[calc(100%-16px)] !transform-none'
      toastOptions={{
        classNames: {
          toast: '!w-max !max-w-[min(400px,95%)] !left-1/2 [translate:-50%]',
        },
      }}
    />
  )
}
