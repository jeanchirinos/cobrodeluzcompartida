import { Select } from '@/components/Select'
import { getRentalGroupById } from '@/controllers/RentalGroupController/getRentalGroupById'
import {
  GetRentalGroupRegisterParams,
  getRentalGroupRegister,
} from '@/controllers/RentalGroupRegisterController/getRentalGroupRegister'
import { IconAdd } from '@/icons'
import { PageParamsAndSearchParamsPropsAlt } from '@/types'
import { Button } from '@nextui-org/button'

type Props = PageParamsAndSearchParamsPropsAlt<'id', GetRentalGroupRegisterParams>

export default async function Page(props: Props) {
  const rentalGroup = await getRentalGroupById({ id: props.params.id })

  const rentalGroupRegister = await getRentalGroupRegister({
    params: { rentalGroupId: Number(props.params.id) },
    searchParams: props.searchParams,
  })

  if (!rentalGroup || !rentalGroupRegister) return null

  const { billData } = rentalGroupRegister

  return (
    <>
      <header className='flex justify-between items-center'>
        <section className='flex gap-x-2'>
          <Select label='Año' className='w-[12rem] max-w-full' options={['2024', '2023']} />
          <Select
            label='Mes'
            className='w-[12rem] max-w-full'
            options={[
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Diciembre',
            ]}
          />
        </section>
        <Button variant='shadow' color='primary' endContent={<IconAdd />}>
          Agregar registro
        </Button>
      </header>

      <details>
        <summary className='text-large font-semibold'>Datos del recibo</summary>
        <div className='pt-4'>Consumo kWh: {billData.consumption_kwh}</div>
      </details>

      <details open>
        <summary className='text-large font-semibold'>Resultados</summary>
      </details>
    </>
  )
}