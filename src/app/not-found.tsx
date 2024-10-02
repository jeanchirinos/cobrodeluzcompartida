'use client'

import { IconArrowBack } from '@/icons'
import { ROUTE } from '@/constants/routes'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const { push } = useRouter()

  return (
    <main className='h-dvh flex-col gap-y-4 flex-center'>
      <h1 className='text-8xl font-bold'>404</h1>
      <p>Recurso no encontrado</p>

      <Button startContent={<IconArrowBack />} onClick={() => push(ROUTE.HOME)}>
        Ir a inicio
      </Button>
    </main>
  )
}
