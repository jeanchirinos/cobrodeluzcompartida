import { IconAdd } from '@/icons'
import { Button } from '@nextui-org/button'
import { Metadata } from 'next'
import { Selects } from './components/Selects'
import { RentalGroupRegister } from './components/RentalGroupRegister'

export const metadata: Metadata = {
  title: 'Registros',
}

export default function Page() {
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
      <RentalGroupRegister />
    </>
  )
}
