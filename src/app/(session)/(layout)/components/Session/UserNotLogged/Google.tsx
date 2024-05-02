'use client'

import { Button } from '@nextui-org/button'
import { useGoogle } from '@/hooks/useGoogle'
import { IconGoogle } from '@/icons'
import { $BUTTON_LOGIN_ID } from '@/constants/elements'

export function Google() {
  const { openGoogleWindow } = useGoogle()

  return (
    <Button id={$BUTTON_LOGIN_ID} onPress={openGoogleWindow} startContent={<IconGoogle />}>
      Continuar con Google
    </Button>
  )
}
