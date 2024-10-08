'use client'

import { useGetRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister/useGetRentalRegister'
import { BillData } from './BillData'
import { SuspenseFallback } from '@/components/other/SuspenseFallback'
import { ResultsTable } from '@/components/other/ResultsTable/ResultsTable'
import { ResultRow } from '@/components/other/ResultsTable/ResultsTable.type'
import { ErrorUi } from '@/components/other/ComponentError'

export function RentalGroupRegister() {
  const { data, isError, isPending } = useGetRentalGroupRegister()

  if (isPending) return <SuspenseFallback />
  if (isError) return <ErrorUi />

  if (data === null) return <p>No existe un registro en este periodo</p>

  const results: ResultRow[] = data.rentalGroupRegister.results.map(result => ({
    ...result,
    result: {
      amount: result.amount,
      consumption_kwh: result.consumption_kwh,
    },
  }))

  return (
    <section className='flex gap-x-24 gap-y-12 max-lg:flex-col'>
      <details open>
        <summary className='mb-4 text-large font-semibold sm:pointer-events-none sm:list-none'>
          Datos del recibo
        </summary>
        <BillData />
      </details>

      <details open>
        <summary className='mb-4 text-large font-semibold sm:pointer-events-none sm:list-none'>Resultados</summary>
        <ResultsTable results={results} variant='registers' />
      </details>
    </section>
  )
}
