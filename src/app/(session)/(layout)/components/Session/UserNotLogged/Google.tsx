'use client'

import { Button } from '@nextui-org/button'
import { useGoogle } from '@/hooks/useGoogle'
import { IconGoogle } from '@/icons'
import { $LOGIN_BUTTON } from '@/constants/elements'

export function Google() {
  const { openGoogleWindow } = useGoogle()

  return (
    <Button id={$LOGIN_BUTTON} onPress={openGoogleWindow} startContent={<IconGoogle />}>
      Continuar con Google
    </Button>
  )
}
