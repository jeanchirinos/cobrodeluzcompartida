'use client'

import { ResultsTable } from '@/components/other/ResultsTable/ResultsTable'
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
import { useEffect } from 'react'
import { useWatch } from 'react-hook-form'
import { removeCookie } from 'typescript-cookie'

type Props = {
  results: ResultRow[]
  setResults: SetState<ResultRow[]>
}

export function Results(props: Props) {
  const { results, setResults } = props

  const values = useWatch<CalculateResults>({})

  useEffect(() => {
    const { billData, consumptions } = values as CalculateResults

    let newResults: ResultRow[] = []
    const validation = schemaCalculateResults.safeParse(values)
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
  }, [values, setResults])

  return (
    <section className='sticky top-40 space-y-10'>
      <h3 className='text-large font-semibold'>Resultados</h3>
      <ResultsTable results={results} />
    </section>
  )
}
