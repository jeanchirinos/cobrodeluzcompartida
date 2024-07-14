'use client'

import { useGetRentalGroupRegister } from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister/useGetRentalRegister'
import { BillData } from './BillData'
import { SuspenseFallback } from '@/components/other/SuspenseFallback'
import { ResultsTable } from './ResultsTable'

export function RentalGroupRegister() {
  const {
    data: { rentalGroupRegister },
    isLoading,
  } = useGetRentalGroupRegister()

  if (isLoading) return <SuspenseFallback />

  if (!rentalGroupRegister) return <p>No existe un registro en este periodo</p>

  return (
    <>
      <details>
        <summary className='mb-4 text-large font-semibold'>Datos del recibo</summary>
        <BillData />
      </details>

      <details open>
        <summary className='mb-4 text-large font-semibold'>Resultados</summary>
        <ResultsTable />
      </details>
    </>
  )
}
