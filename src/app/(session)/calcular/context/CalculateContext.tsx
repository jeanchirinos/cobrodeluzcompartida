'use client'

import {
  ResponseCalculateResults,
  calculateResults,
} from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults'
import { schemaCalculateResults } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { SetState } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm, type UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

type ContextValue = {
  useFormHook: UseFormReturn<z.infer<typeof schemaCalculateResults>> & { isDisabled: boolean }
  result: ResponseCalculateResults | null
  setResult: SetState<ResponseCalculateResults | null>
}

export type CalculateOnSubmit = SubmitHandler<z.infer<typeof schemaCalculateResults>>

const CalculateContext = createContext({} as ContextValue)

export function CalculateProvider(props: React.PropsWithChildren) {
  const useFormHook = useForm<z.infer<typeof schemaCalculateResults>>({
    mode: 'onTouched',
    resolver: zodResolver(schemaCalculateResults),
    defaultValues: {
      consumptions: [{ consumption_kwh: undefined, alias: 'Consumo 1' }],
    },
  })

  const [result, setResult] = useState<null | ResponseCalculateResults>(null)

  const { formState, getValues } = useFormHook
  const { isValid, isSubmitting, isDirty, isValidating } = formState

  const isDisabled = !isValid || isSubmitting || !isDirty

  useEffect(() => {
    const data = getValues()

    async function executeCalculateResults() {
      const result = await calculateResults(data)
      setResult(result)
    }

    void executeCalculateResults()
  }, [getValues, isValidating])

  return (
    <CalculateContext.Provider
      value={{
        useFormHook: { ...useFormHook, isDisabled },
        result,
        setResult,
      }}
      {...props}
    />
  )
}

export const useCalculateContext = () => useContext(CalculateContext)
