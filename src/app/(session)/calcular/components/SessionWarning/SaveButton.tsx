'use client'

import { Button } from '@nextui-org/button'
import { setCookie } from 'typescript-cookie'
import { COOKIES_TEMPORAL_FORM_DATA } from '@/constants/cookies'
import { useCalculateContext } from '../../context/CalculateContext'
import { $BUTTON_LOGIN_ID } from '@/constants/elements'
import { ResponseCalculateResults } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults'
import { z } from 'zod'
import { schemaCalculateResults } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'

export type CookiesFormDataAndResults = {
  billData: z.infer<typeof schemaCalculateResults>['billData']
  result: ResponseCalculateResults
}

export function SaveButton() {
  const { result, useFormHook } = useCalculateContext()
  const { isDisabled, getValues } = useFormHook

  function handlePress() {
    if (!result) return

    const cookiesFormDataAndResults: CookiesFormDataAndResults = {
      billData: getValues().billData,
      result,
    }

    setCookie(COOKIES_TEMPORAL_FORM_DATA, JSON.stringify(cookiesFormDataAndResults))

    const loginButton = document.getElementById($BUTTON_LOGIN_ID)
    loginButton?.click()
  }

  return (
    <Button color='secondary' size='sm' onPress={handlePress} className='inline' isDisabled={isDisabled}>
      Guardar datos
    </Button>
  )
}
