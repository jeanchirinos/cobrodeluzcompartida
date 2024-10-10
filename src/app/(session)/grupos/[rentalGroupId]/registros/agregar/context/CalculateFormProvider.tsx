'use client'

import { ErrorUi } from '@/components/other/ComponentError'
import { useGetParticipants } from '@/controllers/ParticipantController/getParticipants/useGetParticipants'
import { schemaCalculateResultsAdd } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { useReactHookForm } from '@/hooks/useReactHookForm'
import { FormProvider } from 'react-hook-form'

export function CalculateFormProvider(props: React.PropsWithChildren) {
  const { data, isError } = useGetParticipants()

  const consumptions = data?.participants
    .filter(participant => participant.active && !participant.is_main)
    .map(() => ({
      consumption_kwh: 0,
    }))

  const methods = useReactHookForm({
    mode: 'onTouched',
    schema: schemaCalculateResultsAdd,
    values: {
      consumptions: consumptions ?? [],
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

  if (isError) return <ErrorUi />

  return <FormProvider {...methods}>{props.children}</FormProvider>
}
