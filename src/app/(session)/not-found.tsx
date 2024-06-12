'use client'

import { IconArrowBack } from '@/icons'
import { ROUTE } from '@/routes'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const { back, push } = useRouter()

  function handleBack() {
    const hasNavigatedThroughPagesBefore = window.history.length > 2

    if (hasNavigatedThroughPagesBefore) {
      back()
    } else {
      push(ROUTE.HOME)
    }
  }

  return (
    <main className='-mt-16 grow flex-col gap-y-4 flex-center'>
      <h1 className='text-8xl font-bold'>404</h1>
      <p>Página no encontrada</p>

      <Button startContent={<IconArrowBack />} onClick={handleBack}>
        Regresar
      </Button>
    </main>
  )
}
