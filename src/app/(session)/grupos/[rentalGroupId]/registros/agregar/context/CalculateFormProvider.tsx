'use client'

import { ErrorUi } from '@/components/other/ComponentError'
import { useGetParticipants } from '@/controllers/ParticipantController/getParticipants/useGetParticipants'
import {
  SchemaCalculateResultsAdd,
  schemaCalculateResultsAdd,
} from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { useReactHookForm } from '@/hooks/useReactHookForm'
import { useEffect } from 'react'
import { FormProvider, useFormState, useWatch } from 'react-hook-form'
import { useFormIsValidStore } from '../stores/formIsValid-store'

export function CalculateFormProvider(props: React.PropsWithChildren) {
  const { data, isError } = useGetParticipants()

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

  const { setIsValid } = useFormIsValidStore()

  const formData = useWatch({ control: methods.control })
  const { isValid } = useFormState({ control: methods.control })

  useEffect(() => {
    setIsValid({
      form: isValid,
    })
  }, [isValid, setIsValid, formData])

  if (isError) return <ErrorUi />

  return <FormProvider {...methods}>{props.children}</FormProvider>
}
