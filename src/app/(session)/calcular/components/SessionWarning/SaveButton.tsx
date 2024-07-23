'use client'

import { Button } from '@nextui-org/button'
import { setCookie } from 'typescript-cookie'
import { COOKIES_TEMPORAL_FORM_DATA } from '@/constants/cookies'
import { useCalculateContext } from '../../context/CalculateContext'
import { $BUTTON_LOGIN_ID } from '@/constants/elements'
import { CookiesFormDataAndResults } from '@/controllers/RentalGroupController/utils/createRentalGroupWithSessionCookie.schema'

export function SaveButton() {
  const { results, useFormHook } = useCalculateContext()
  const { isDisabled, getValues } = useFormHook

  function handleSave() {
    const cookiesFormDataAndResults: CookiesFormDataAndResults = {
      billData: getValues().billData,
      results,
    }

    setCookie(COOKIES_TEMPORAL_FORM_DATA, JSON.stringify(cookiesFormDataAndResults))

    const loginButton = document.getElementById($BUTTON_LOGIN_ID)
    loginButton?.click()
  }

  return (
    <Button color='secondary' size='sm' onPress={handleSave} className='inline' isDisabled={isDisabled}>
      Guardar datos
    </Button>
  )
}
