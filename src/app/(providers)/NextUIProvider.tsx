'use client'

import { NextUIProvider as DefaultNextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function NextUIProvider(props: Required<React.PropsWithChildren>) {
  const router = useRouter()

  return <DefaultNextUIProvider {...props} navigate={router.push} />
}
