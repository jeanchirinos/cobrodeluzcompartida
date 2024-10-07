'use client'

import { ResultsTable } from '@/components/other/ResultsTable/ResultsTable'
import { ResultRow } from '@/components/other/ResultsTable/ResultsTable.type'
import { SSTORAGE_TEMPORAL_FORM_DATA } from '@/constants/session-storage'
import {
  calculateAmountPerParticipant,
  getMainParticipantConsumption,
} from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults'
import {
  CalculateResults,
  schemaCalculateResults,
} from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'
import { SetState } from '@/types'
import { useEffect } from 'react'
import { useWatch } from 'react-hook-form'
import { FieldWithData } from './Form/ParticipantsInfo'

type Props = {
  results: ResultRow[]
  setResults: SetState<ResultRow[]>
  fieldsWithData: FieldWithData[]
}

export function Results(props: Props) {
  const { results, setResults, fieldsWithData } = props

  const values = useWatch<CalculateResults>()

  useEffect(() => {
    const isValid = schemaCalculateResults.safeParse(values).success

    if (!isValid) return setResults([])

    const { billData, consumptions } = values as CalculateResults

    const nConsumptions = consumptions.length + 1

    const mainParticipantConsumption = getMainParticipantConsumption({ billData, consumptions })

    const adminResult: ResultRow = {
      id: 1,
      result: {
        amount: calculateAmountPerParticipant({
          billData,
          nConsumptions,
          consumption_kwh: mainParticipantConsumption,
        }),
        consumption_kwh: mainParticipantConsumption,
      },
      tenant: {
        alias: 'Admistrador',
      },
    }

    const participantsResults: ResultRow[] = consumptions.map((field, i) => ({
      id: i,
      result: {
        amount: calculateAmountPerParticipant({
          billData,
          nConsumptions,
          consumption_kwh: field.consumption_kwh,
        }),
        consumption_kwh: field.consumption_kwh,
      },
      tenant: {
        alias: fieldsWithData[i].alias,
      },
    }))

    const newResults: ResultRow[] = [adminResult, ...participantsResults]

    setResults(newResults)

    sessionStorage.removeItem(SSTORAGE_TEMPORAL_FORM_DATA)
  }, [values, setResults, fieldsWithData])

  return (
    <section className='sticky top-40 space-y-10'>
      <h3 className='text-large font-semibold'>Resultados</h3>
      <ResultsTable results={results} />
    </section>
  )
}
