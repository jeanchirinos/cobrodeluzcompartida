'use client'

import { Button } from '@nextui-org/button'
import { setCookie, removeCookie } from 'typescript-cookie'
import { COOKIES_TEMPORAL_FORM_DATA } from '@/constants/cookies'
import { useCalculateContext } from '../../context/CalculateContext'
import { $BUTTON_LOGIN_ID } from '@/constants/elements'
import { CookiesFormDataAndResults } from '@/controllers/RentalGroupController/utils/createRentalGroupWithSessionCookie.schema'
import { useEffect, useState } from 'react'
import { IconDelete } from '@/icons'

export function SaveButton() {
  const { results, useFormHook } = useCalculateContext()
  const { isDisabled, getValues } = useFormHook

  const [dataWasSaved, setDataWasSaved] = useState(false)

  useEffect(() => {
    setDataWasSaved(false)
  }, [results])

  function handleSave() {
    const cookiesFormDataAndResults: CookiesFormDataAndResults = {
      billData: getValues().billData,
      results: results.map(result => ({
        amount: result.result.amount,
        consumption_kwh: result.result.consumption_kwh,
      })),
    }

    setCookie(COOKIES_TEMPORAL_FORM_DATA, JSON.stringify(cookiesFormDataAndResults))
    setDataWasSaved(true)

    const loginButton = document.getElementById($BUTTON_LOGIN_ID)
    loginButton?.click()
  }

  function handleRemoveSavedData() {
    removeCookie(COOKIES_TEMPORAL_FORM_DATA)
    setDataWasSaved(false)
  }

  const isDisabledOrSaved = isDisabled || dataWasSaved

  return (
    <>
      <Button color='secondary' size='sm' onPress={handleSave} className='inline' isDisabled={isDisabledOrSaved}>
        {dataWasSaved ? 'Datos guardados' : 'Guardar datos'}
      </Button>

      {dataWasSaved && (
        <Button
          onPress={handleRemoveSavedData}
          isIconOnly
          size='sm'
          aria-label='Remover datos guardados'
          title='Remover datos guardados'
          variant='flat'
          color='danger'
        >
          <IconDelete />
        </Button>
      )}
    </>
  )
}
