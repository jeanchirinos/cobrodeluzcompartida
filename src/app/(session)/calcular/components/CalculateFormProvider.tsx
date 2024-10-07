'use client'

import { schemaCalculateResults } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

export function CalculateFormProvider(props: React.PropsWithChildren) {
  const methods = useForm({
    mode: 'onTouched',
    resolver: zodResolver(schemaCalculateResults),
    defaultValues: {
      consumptions: [{ consumption_kwh: undefined }],
    },
  })

  return <FormProvider {...methods}>{props.children}</FormProvider>
}
