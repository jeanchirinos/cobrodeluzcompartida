'use client'

import { ErrorUi } from '@/components/other/ComponentError'
import { ResultsTable } from '@/components/other/ResultsTable/ResultsTable'
import { ResultRow } from '@/components/other/ResultsTable/ResultsTable.type'
import { useGetParticipants } from '@/controllers/ParticipantController/getParticipants/useGetParticipants'
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
import { useFormIsValidStore } from '../../stores/formIsValid-store'
import { FieldWithData } from './Form/ParticipantsInfo'

type Props = {
  results: ResultRow[]
  setResults: SetState<ResultRow[]>
  fieldsWithData: FieldWithData[]
}

export function Results(props: Props) {
  const { results, setResults, fieldsWithData } = props

  const values = useWatch<SchemaCalculateResultsAdd>()
  const { isValid } = useFormIsValidStore()

  const { data, isError } = useGetParticipants()

  const { participants } = data ?? {}

  // Calculate results when values change
  useEffect(() => {
    // TODO: Add debouncing and make request to API to get the results

    const validationSuccess = schemaCalculateResultsAdd.safeParse(values).success

    if (!isValid.all || !validationSuccess) return setResults([])

    const { billData, consumptions } = values as SchemaCalculateResultsAdd

    const nConsumptions = consumptions.length + 1

    if (!participants) return

    const mainParticipant = participants.find(participant => participant.is_main)
    if (!mainParticipant) return

    const consumptions2 = fieldsWithData.map(field => ({
      consumption_kwh: field.consumption_kwh,
    }))

    const mainParticipantConsumption = getMainParticipantConsumption({ billData, consumptions: consumptions2 })

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

    const participantsResults: ResultRow[] = consumptions.map((_, i) => ({
      result: {
        amount: calculateAmountPerParticipant({
          billData,
          nConsumptions,
          consumption_kwh: fieldsWithData[i].consumption_kwh,
        }),
        consumption_kwh: fieldsWithData[i].consumption_kwh,
      },
      id: fieldsWithData[i].id,
      participant: {
        active: fieldsWithData[i].active,
        alias: fieldsWithData[i].alias,
        id: fieldsWithData[i].id,
        is_main: fieldsWithData[i].is_main,
      },
      tenant: fieldsWithData[i].tenant,
    }))

    const newResults: ResultRow[] = [adminResult, ...participantsResults]

    setResults(newResults)
  }, [values, setResults, fieldsWithData, participants, isValid])

  if (isError) return <ErrorUi />

  return (
    <section className='sticky top-40 space-y-10'>
      <h3 className='text-large font-semibold'>Resultados</h3>
      <ResultsTable results={results} />
    </section>
  )
}
