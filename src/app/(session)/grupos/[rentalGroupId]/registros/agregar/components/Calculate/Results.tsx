'use client'

import { ResultsTable } from '@/components/other/ResultsTable/ResultsTable'
import { ResultRow } from '@/components/other/ResultsTable/ResultsTable.type'
import {
  calculateAmountPerParticipant,
  getMainParticipantConsumption,
} from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults'
import {
  schemaCalculateResultsAdd,
  SchemaCalculateResultsAdd,
} from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { SetState } from '@/types'
import { useEffect } from 'react'
import { useWatch } from 'react-hook-form'
import { FieldWithData } from './Form/ParticipantsInfo'
import { useGetParticipants } from '@/controllers/ParticipantController/getParticipants/useGetParticipants'
import { ErrorUi } from '@/components/other/ComponentError'

type Props = {
  results: ResultRow[]
  setResults: SetState<ResultRow[]>
  fieldsWithData: FieldWithData[]
}

export function Results(props: Props) {
  const { results, setResults, fieldsWithData } = props

  const values = useWatch<SchemaCalculateResultsAdd>()

  const { data, isError } = useGetParticipants()

  const { participants } = data ?? {}

  useEffect(() => {
    const isValid = schemaCalculateResultsAdd.safeParse(values).success

    if (!isValid) return setResults([])

    const { billData, consumptions } = values as SchemaCalculateResultsAdd

    const nConsumptions = consumptions.length + 1

    if (!participants) return

    const mainParticipant = participants.find(participant => participant.is_main)
    if (!mainParticipant) return

    const mainParticipantConsumption = getMainParticipantConsumption({ billData, consumptions })

    const adminResult: ResultRow = {
      result: {
        amount: calculateAmountPerParticipant({
          billData,
          nConsumptions,
          consumption_kwh: mainParticipantConsumption,
        }),
        consumption_kwh: mainParticipantConsumption,
      },
      ...mainParticipant,
    }

    const participantsResults: ResultRow[] = consumptions.map((field, i) => ({
      result: {
        amount: calculateAmountPerParticipant({
          billData,
          nConsumptions,
          consumption_kwh: field.consumption_kwh,
        }),
        consumption_kwh: field.consumption_kwh,
      },
      ...fieldsWithData[i],
    }))

    const newResults: ResultRow[] = [adminResult, ...participantsResults]

    setResults(newResults)
  }, [values, setResults, fieldsWithData, participants])

  if (isError) return <ErrorUi />

  return (
    <section className='sticky top-40 space-y-10'>
      <h3 className='text-large font-semibold'>Resultados</h3>
      <ResultsTable results={results} />
    </section>
  )
}
