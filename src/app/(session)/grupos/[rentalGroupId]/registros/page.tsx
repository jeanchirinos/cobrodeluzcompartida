import { IconAdd } from '@/icons'
import { Metadata } from 'next'
import { RentalGroupRegister } from './components/RentalGroupRegister'
import { ButtonLink } from '@/components/Button/ButtonLink'
import { ROUTE } from '@/constants/routes'
import { PagePropsParams } from '@/types'
import { SelectMonth, SelectYear } from './components/Selects'
import { RentalGroupRegisterOptions } from './components/RentalGroupRegisterOptions'

export const metadata: Metadata = {
  title: 'Registros',
}

export default function Page(props: PagePropsParams<'rentalGroupId'>) {
  return (
    <>
      <header className='flex flex-wrap items-end justify-between gap-6'>
        <section className='flex flex-wrap items-end gap-3'>
          <div className='flex flex-wrap gap-4'>
            <SelectYear />
            <SelectMonth />
          </div>
          <RentalGroupRegisterOptions />
        </section>
        <ButtonLink
          href={ROUTE.GROUPS.REGISTERS.ADD({ id: props.params.rentalGroupId })}
          variant='flat'
          color='primary'
          endContent={<IconAdd />}
        >
          Agregar registro
        </ButtonLink>
      </header>
      <RentalGroupRegister />
    </>
  )
}
