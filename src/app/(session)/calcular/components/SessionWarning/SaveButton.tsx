'use client'

import { $LOGIN_BUTTON } from '@/elements'
import { Button } from '@nextui-org/button'
import { getFormData } from '../utils/getFormData'

export function SaveButton() {
  function handleClick() {
    const formData = getFormData()
    sessionStorage.setItem('temporalFormData', JSON.stringify(formData))

    const loginButton = document.getElementById($LOGIN_BUTTON)
    loginButton?.click()
  }

  return (
    <Button color='secondary' size='sm' onClick={handleClick} className='inline'>
      Guardar datos
    </Button>
  )
}
