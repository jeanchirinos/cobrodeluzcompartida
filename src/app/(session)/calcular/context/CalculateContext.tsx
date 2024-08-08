'use client'

import { ResultRow } from '@/components/other/ResultsTable/ResultsTable.type'
import { COOKIES_TEMPORAL_FORM_DATA } from '@/constants/cookies'
import {
  calculateAmountPerParticipant,
  getMainParticipantConsumption,
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
  results: ResultRow[]
  setResults: SetState<ResultRow[]>
}

export type CalculateOnSubmit = SubmitHandler<CalculateResults>

const CalculateContext = createContext({} as ContextValue)

export function CalculateProvider(props: React.PropsWithChildren) {
  const useFormHook = useForm<CalculateResults>({
    mode: 'onTouched',
    resolver: zodResolver(schemaCalculateResults),
    defaultValues: {
      consumptions: [{ consumption_kwh: undefined }],
    },
  })

  const [results, setResults] = useState<ResultRow[]>([])

  const { formState, getValues } = useFormHook
  const { isValid, isSubmitting, isDirty, isValidating } = formState

  const isDisabled = !isValid || isSubmitting || !isDirty

  useEffect(() => {
    async function executeCalculateResults() {
      const { billData, consumptions } = getValues()

      let newResults: ResultRow[] = []

      const validation = schemaCalculateResults.safeParse(getValues())

      const mainParticipantConsumption = getMainParticipantConsumption({ billData, consumptions })

      if (validation.success) {
        newResults = [
          {
            id: 1,
            result: {
              amount: calculateAmountPerParticipant({
                billData,
                nConsumptions: consumptions.length + 1,
                consumption_kwh: mainParticipantConsumption,
              }),
              consumption_kwh: mainParticipantConsumption,
            },
            tenant: {
              alias: 'Administrador',
            },
          },
          ...consumptions.map((consumption, i) => ({
            id: i + 2,
            result: {
              amount: calculateAmountPerParticipant({
                billData,
                nConsumptions: consumptions.length + 1,
                consumption_kwh: consumption.consumption_kwh,
              }),
              consumption_kwh: consumption.consumption_kwh,
            },
            tenant: {
              alias: `Consumo ${i + 1}`,
            },
          })),
        ]
      }

      setResults(newResults)

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
