'use client'

import { $LOGIN_BUTTON } from '@/constants/elements'
import { Button } from '@nextui-org/button'
import { getFormData } from '../utils/getFormData'
import { setCookie } from 'typescript-cookie'
import { COOKIES_TEMPORAL_FORM_DATA } from '@/constants/cookies'

export function SaveButton() {
  function handleClick() {
    const formData = getFormData()

    setCookie(COOKIES_TEMPORAL_FORM_DATA, JSON.stringify(formData))

    const loginButton = document.getElementById($LOGIN_BUTTON)
    loginButton?.click()
  }

  return (
    <Button color='secondary' size='sm' onClick={handleClick} className='inline'>
      Guardar datos
    </Button>
  )
}
