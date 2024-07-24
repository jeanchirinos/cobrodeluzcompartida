'use client'

import { COOKIES_TEMPORAL_FORM_DATA } from '@/constants/cookies'
import {
  ResponseCalculateResults,
  calculateResults,
} from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults'
import {
  CalculateResults,
  schemaCalculateResults,
} from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { SetState } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm, type UseFormReturn } from 'react-hook-form'
import { removeCookie } from 'typescript-cookie'

type ContextValue = {
  useFormHook: UseFormReturn<CalculateResults> & { isDisabled: boolean }
  results: ResponseCalculateResults
  setResults: SetState<ResponseCalculateResults>
}

export type CalculateOnSubmit = SubmitHandler<CalculateResults>

const CalculateContext = createContext({} as ContextValue)

export function CalculateProvider(props: React.PropsWithChildren) {
  const useFormHook = useForm<CalculateResults>({
    mode: 'onTouched',
    resolver: zodResolver(schemaCalculateResults),
    defaultValues: {
      consumptions: [{ consumption_kwh: undefined, alias: 'Consumo 1' }],
    },
  })

  const [results, setResults] = useState<ResponseCalculateResults>([])

  const { formState, getValues } = useFormHook
  const { isValid, isSubmitting, isDirty, isValidating } = formState

  const isDisabled = !isValid || isSubmitting || !isDirty

  useEffect(() => {
    const data = getValues()

    async function executeCalculateResults() {
      const result = await calculateResults(data)
      setResults(result)
      removeCookie(COOKIES_TEMPORAL_FORM_DATA)
    }

    void executeCalculateResults()
  }, [getValues, isValidating])

  return (
    <CalculateContext.Provider
      value={{
        useFormHook: { ...useFormHook, isDisabled },
        results,
        setResults,
      }}
      {...props}
    />
  )
}

export const useCalculateContext = () => useContext(CalculateContext)
