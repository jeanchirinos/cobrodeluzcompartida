'use client'

import { ResultRow } from '@/components/other/ResultsTable/ResultsTable.type'
import { $BUTTON_LOGIN_ID } from '@/constants/elements'
import { SSTORAGE_TEMPORAL_FORM_DATA } from '@/constants/session-storage'
import { CalculateResults } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { SchemaCreateRentalGroupWithRegister } from '@/controllers/RentalGroupRegisterController/createRentalGroupWithRegister/createRentalGroupWithRegister.schema'
import { IconDelete } from '@/icons'
import { Button } from '@nextui-org/button'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  results: ResultRow[]
}

export function SaveButton(props: Props) {
  const { results } = props

  const {
    getValues,
    formState: { isValid },
  } = useFormContext<CalculateResults>()

  const [dataWasSaved, setDataWasSaved] = useState(false)

  useEffect(() => {
    return () => {
      sessionStorage.removeItem(SSTORAGE_TEMPORAL_FORM_DATA)
    }
  }, [])

  useEffect(() => {
    setDataWasSaved(false)
    sessionStorage.removeItem(SSTORAGE_TEMPORAL_FORM_DATA)
  }, [results])

  function handleSave() {
    const cookiesFormDataAndResults: SchemaCreateRentalGroupWithRegister = {
      billData: getValues().billData,
      results: results.map(result => {
        const { consumption_kwh, amount } = result.result

        return {
          amount,
          consumption_kwh,
        }
      }),
    }

    setDataWasSaved(true)
    sessionStorage.setItem(SSTORAGE_TEMPORAL_FORM_DATA, JSON.stringify(cookiesFormDataAndResults))

    const loginButton = document.getElementById($BUTTON_LOGIN_ID)
    loginButton?.click()
  }

  function handleRemoveSavedData() {
    sessionStorage.removeItem(SSTORAGE_TEMPORAL_FORM_DATA)
    setDataWasSaved(false)
  }

  const isDisabled = !isValid || dataWasSaved

  return (
    <>
      <Button color='secondary' size='sm' onPress={handleSave} className='inline' isDisabled={isDisabled}>
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
