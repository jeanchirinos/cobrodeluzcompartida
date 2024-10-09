import { ButtonBack } from '@/components/Button/ButtonBack'
import { ROUTE } from '@/constants/routes'
import { PagePropsParams } from '@/types'
import { SelectMonth, SelectYear } from './components/Selects'
import { Results } from './components/Calculate/Results'
import { CalculateProvider } from './context/CalculateContext'
import { AddRegisterForm } from './components/Calculate/Form/AddRegisterForm'

export default function Page(props: PagePropsParams<'rentalGroupId'>) {
  return (
    <>
      <section className='flex items-center gap-x-2'>
        <ButtonBack href={ROUTE.GROUPS.REGISTERS.INDEX({ rentalGroupId: props.params.rentalGroupId })} />
        <h2 className='text-xl font-bold'>Agregar registro</h2>
      </section>
      <CalculateProvider>
        <section className='flex flex-wrap gap-4'>
          <SelectYear />
          <SelectMonth />
        </section>
        <section className='flex gap-14 max-md:flex-col lg:gap-x-16'>
          <AddRegisterForm />
          <Results />
        </section>
      </CalculateProvider>
    </>
  )
}
