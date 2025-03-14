'use client'

import { AppProgressBar } from 'next-nprogress-bar'

export function ProgressBar() {
  return (
    <AppProgressBar height='1.5px' color='hsl(var(--heroui-primary))' options={{ showSpinner: false }} shallowRouting />
  )
}
