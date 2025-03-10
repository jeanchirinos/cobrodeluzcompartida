'use client'

import { HeroUIProvider as DefaultHeroUIProvider } from '@heroui/react'
import { useRouter } from 'next/navigation'

export function HeroUIProvider(props: Required<React.PropsWithChildren>) {
  const router = useRouter()

  return <DefaultHeroUIProvider {...props} navigate={router.push} />
}
