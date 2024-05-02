'use client'

import { $BUTTON_LOGIN_ID } from '@/constants/elements'
import { Button } from '@nextui-org/button'
import { getFormData } from '../utils/getFormData'
import { setCookie } from 'typescript-cookie'
import { COOKIES_TEMPORAL_FORM_DATA } from '@/constants/cookies'
import { getResult } from '../Calculate/Form/utils/calculateAmount'

export function SaveButton() {
  function handleClick() {
    const formData = getFormData()
    const result = getResult(formData as any)

    setCookie(COOKIES_TEMPORAL_FORM_DATA, JSON.stringify(result))

    const loginButton = document.getElementById($BUTTON_LOGIN_ID)
    loginButton?.click()
  }

  return (
    <Button color='secondary' size='sm' onClick={handleClick} className='inline'>
      Guardar datos
    </Button>
  )
}
