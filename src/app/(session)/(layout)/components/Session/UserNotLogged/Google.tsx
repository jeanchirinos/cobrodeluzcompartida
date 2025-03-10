'use client'

import { useGoogle } from '@/hooks/useGoogle'
import { IconGoogle } from '@/icons'
import { Button } from '@heroui/button'

export function Google() {
  const { openGoogleWindow } = useGoogle()

  return (
    <Button onPress={openGoogleWindow} startContent={<IconGoogle />}>
      <span className='max-sm:hidden'>Continuar con Google</span>
      <span className='sm:hidden'>Ingresar</span>
    </Button>
  )
}
