'use client'

import { schemaCalculateResults } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

export function MyFormProvider(props: React.PropsWithChildren) {
  const methods = useForm({
    mode: 'onTouched',
    resolver: zodResolver(schemaCalculateResults),
    defaultValues: {
      billData: {
        consumption_kwh: 0,
        kwh_price: 0,
        current_month_total: 0,
        total: 0,
      },
      consumptions: [{ consumption_kwh: 0 }],
    },
  })

  return <FormProvider {...methods}>{props.children}</FormProvider>
}
