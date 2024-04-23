'use client'

import { $LOGIN_BUTTON } from '@/elements'
import { Button } from '@nextui-org/button'

export function SaveButton() {
  function handleClick() {
    sessionStorage.setItem('temporalData', JSON.stringify({}))

    const loginButton = document.getElementById($LOGIN_BUTTON)
    loginButton?.click()
  }

  return (
    <Button color='secondary' size='sm' onClick={handleClick}>
      Guardar datos
    </Button>
  )
}
