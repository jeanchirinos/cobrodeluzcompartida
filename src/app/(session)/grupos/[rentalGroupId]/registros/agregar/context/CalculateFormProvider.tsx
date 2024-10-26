'use client'

import { ErrorUi } from '@/components/other/ComponentError'
import { useGetParticipants } from '@/controllers/ParticipantController/getParticipants/useGetParticipants'
import {
  SchemaCalculateResultsAdd,
  schemaCalculateResultsAdd,
} from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { useGetRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister/useGetRentalRegister'
import { useReactHookForm } from '@/hooks/useReactHookForm'
import { useEffect } from 'react'
import { FieldErrors, FormProvider, useFormState, useWatch } from 'react-hook-form'
import { useFormIsValidStore } from '../stores/formIsValid-store'

export function CalculateFormProvider(props: React.PropsWithChildren) {
  const { data, isError } = useGetParticipants()
  const { data: rentalGroupRegisterData } = useGetRentalGroupRegister({ lastMonth: true })

  const consumptions: SchemaCalculateResultsAdd['consumptions'] | undefined =
    data?.participants
      .filter(participant => participant.active && !participant.is_main)
      .map(() => ({
        consumption_kwh: 0,
        meter_reading: 0,
      })) ?? []

  const methods = useReactHookForm({
    mode: 'onTouched',
    schema: schemaCalculateResultsAdd,
    values: {
      consumptions,
      billData: {
        consumption_kwh: 0,
        kwh_price: 0,
        current_month_total: 0,
        total: 0,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      },
    },
  })

  const { setIsValid, setCustomErrors } = useFormIsValidStore()

  const formData = useWatch({ control: methods.control })
  const { isValid, errors } = useFormState({ control: methods.control })

  useEffect(() => {
    const availableResults = rentalGroupRegisterData?.rentalGroupRegister.results.filter(
      result => !result.participant.is_main,
    )

    const customConsumptionsErrors: Array<FieldErrors<SchemaCalculateResultsAdd['consumptions'][0]>> = []

    formData.consumptions?.forEach((field, i) => {
      const lastMeterReading = availableResults?.[i].meter_reading ?? 0
      const currentMeterReading = field.meter_reading ?? 0

      if (currentMeterReading < lastMeterReading) {
        customConsumptionsErrors.push({
          meter_reading: {
            type: 'min',
            message: 'La medición actual no puede ser menor a la anterior',
          },
        })
      }
    })

    const newIsValid = isValid && customConsumptionsErrors.length === 0

    setCustomErrors(customConsumptionsErrors)

    setIsValid(newIsValid)
  }, [setIsValid, isValid, errors, formData, rentalGroupRegisterData, setCustomErrors])

  if (isError) return <ErrorUi />

  return <FormProvider {...methods}>{props.children}</FormProvider>
}
