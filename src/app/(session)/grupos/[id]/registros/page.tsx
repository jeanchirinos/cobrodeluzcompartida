import {
  GetRentalGroupRegisterParams,
  RentalGroupRegisterFound,
  getRentalGroupRegister,
} from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister'
import { IconAdd } from '@/icons'
import { PageParamsAndSearchParamsPropsAlt } from '@/types'
import { Button } from '@nextui-org/button'
import { ResultsTable } from './components/ResultsTable'
import { Metadata } from 'next'
import { SelectMonth, SelectYear } from './components/Selects'

export const metadata: Metadata = {
  title: 'Registros',
}

type Props = PageParamsAndSearchParamsPropsAlt<'id', GetRentalGroupRegisterParams>

export default async function Page(props: Props) {
  const { rentalGroupRegister } = await getRentalGroupRegister({
    params: { rentalGroupId: Number(props.params.id) },
    searchParams: props.searchParams,
  })

  const { billData } = rentalGroupRegister ?? {}

  return (
    <>
      <header className='flex flex-wrap items-end justify-between gap-y-6'>
        <section className='flex flex-wrap gap-x-2'>
          <SelectYear year={billData?.year} />
          <SelectMonth month={billData?.month} />
        </section>
        <Button variant='shadow' color='primary' endContent={<IconAdd />}>
          Agregar registro
        </Button>
      </header>

      {rentalGroupRegister ? (
        <RentalGroupRegister rentalGroupRegister={rentalGroupRegister} />
      ) : (
        <p>No hay registros</p>
      )}
    </>
  )
}

function RentalGroupRegister(props: { rentalGroupRegister: RentalGroupRegisterFound }) {
  const { billData, results } = props.rentalGroupRegister

  return (
    <>
      <section className='text-2xl font-bold'>
        {billData.year} - {billData.month}
      </section>

      <details>
        <summary className='text-large font-semibold'>Datos del recibo</summary>
        <div className='mt-4'>
          <p>Consumo kWh: {billData.consumption_kwh}</p>
          <p>Precio kWh: S/. {billData.kwh_price}</p>
          <p>Total mes actual: S/. {billData.current_month_total}</p>
          <p>Total: S/. {billData.total}</p>
          <p>IGV: {billData.igv}</p>
        </div>
      </details>

      <details open>
        <summary className='text-large font-semibold'>Resultados</summary>
        <div className='mt-4'>
          <ResultsTable results={results} />
        </div>
      </details>
    </>
  )
}
