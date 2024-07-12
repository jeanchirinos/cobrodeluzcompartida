import {
  GetRentalGroupRegisterParams,
  getRentalGroupRegister,
} from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister'
import { IconAdd } from '@/icons'
import { PageParamsAndSearchParamsPropsAlt } from '@/types'
import { Button } from '@nextui-org/button'
import { ResultsTable } from './components/ResultsTable'
import { Metadata } from 'next'
import { Selects } from './components/Selects'
import { Suspense } from '@/components/other/CustomSuspense'

export const metadata: Metadata = {
  title: 'Registros',
}

type Props = PageParamsAndSearchParamsPropsAlt<'rentalGroupId', GetRentalGroupRegisterParams>

export default function Page(props: Props) {
  return (
    <>
      <header className='flex flex-wrap items-end justify-between gap-6'>
        <section className='flex flex-wrap gap-4'>
          <Selects />
        </section>
        <Button variant='shadow' color='primary' endContent={<IconAdd />}>
          Agregar registro
        </Button>
      </header>

      <Suspense key={JSON.stringify(props.searchParams)}>
        <RentalGroupRegister {...props} />
      </Suspense>
    </>
  )
}

async function RentalGroupRegister(props: Props) {
  const { rentalGroupRegister } = await getRentalGroupRegister({
    params: { rentalGroupId: Number(props.params.rentalGroupId) },
    searchParams: props.searchParams,
  })

  if (!rentalGroupRegister) return <p>No hay registros</p>

  const { billData, results } = rentalGroupRegister ?? {}

  return (
    <>
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
