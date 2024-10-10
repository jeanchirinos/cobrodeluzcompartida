'use client'

import { schemaCalculateResults } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { useReactHookForm } from '@/hooks/useReactHookForm'
import { FormProvider } from 'react-hook-form'

export function CalculateFormProvider(props: React.PropsWithChildren) {
  const methods = useReactHookForm({
    mode: 'onTouched',
    schema: schemaCalculateResults,
    defaultValues: {
      consumptions: [{ consumption_kwh: undefined }],
    },
  })

  return <FormProvider {...methods}>{props.children}</FormProvider>
}
