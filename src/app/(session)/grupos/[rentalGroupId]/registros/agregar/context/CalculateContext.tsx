'use client'

import { ResultRow } from '@/components/other/ResultsTable/ResultsTable.type'
import { useGetParticipants } from '@/controllers/ParticipantController/getParticipants/useGetParticipants'
import {
  calculateAmountPerParticipant,
  getMainParticipantConsumption,
} from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults'
import {
  CalculateResultsAdd,
  schemaCalculateResults,
  schemaCalculateResultsAdd,
} from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'

import { SetState } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm, type UseFormReturn } from 'react-hook-form'

type ContextValue = {
  useFormHook: UseFormReturn<CalculateResultsAdd> & { isDisabled: boolean }
  results: ResultRow[]
  setResults: SetState<ResultRow[]>
}

export type CalculateOnSubmit = SubmitHandler<CalculateResultsAdd>

const CalculateContext = createContext({} as ContextValue)

export function CalculateProvider(props: React.PropsWithChildren) {
  const useFormHook = useForm<CalculateResultsAdd>({
    mode: 'onTouched',
    resolver: zodResolver(schemaCalculateResultsAdd),
    defaultValues: {
      consumptions: [],
    },
  })

  const { data = { participants: [] } } = useGetParticipants()

  const { participants } = data

  const [results, setResults] = useState<ResultRow[]>([])

  const { formState, getValues } = useFormHook
  const { isValid, isSubmitting, isDirty, isValidating } = formState

  const isDisabled = !isValid || isSubmitting || !isDirty

  useEffect(() => {
    async function executeCalculateResults() {
      const { billData, consumptions } = getValues()

      let newResults: ResultRow[] = []

      const validation = schemaCalculateResults.safeParse(getValues())

      const mainParticipant = participants.find(participant => participant.is_main)
      const otherParticipants = participants.filter(participant => !participant.is_main && participant.active)

      if (!mainParticipant) return

      const { tenant, ...participantAttrs } = mainParticipant

      const mainParticipantConsumption = getMainParticipantConsumption({ billData, consumptions })

      if (validation.success) {
        newResults = [
          {
            id: participantAttrs.id,
            result: {
              amount: calculateAmountPerParticipant({
                billData,
                nConsumptions: consumptions.length + 1,
                consumption_kwh: mainParticipantConsumption,
              }),
              consumption_kwh: mainParticipantConsumption,
            },
            participant: participantAttrs,
            tenant,
          },
          ...otherParticipants.map((participant, i) => ({
            id: participant.id,
            result: {
              amount: calculateAmountPerParticipant({
                billData,
                nConsumptions: consumptions.length + 1,
                consumption_kwh: consumptions[i].consumption_kwh,
              }),
              consumption_kwh: consumptions[i].consumption_kwh,
            },
            participant,
            tenant: participant.tenant,
          })),
        ]
      }

      setResults(newResults)
    }

    void executeCalculateResults()
  }, [getValues, isValidating, participants])

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
