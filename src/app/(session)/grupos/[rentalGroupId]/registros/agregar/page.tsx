import { ButtonBack } from '@/components/Button/ButtonBack'
import { ROUTE } from '@/constants/routes'
import { PagePropsParams } from '@/types'
import { SelectMonth, SelectYear } from './components/Selects'
import { BillInfo } from './components/Calculate/Form/BillInfo'
import { Results } from './components/Calculate/Results'
import { CalculateProvider } from './context/CalculateContext'
import { SaveButton } from './components/SaveButton'
import { ParticipantsInfo } from './components/Calculate/Form/ParticipantsInfo'

export default function Page(props: PagePropsParams<'rentalGroupId'>) {
  return (
    <>
      <section className='flex items-center gap-x-2'>
        <ButtonBack href={ROUTE.GROUPS.REGISTERS.INDEX({ id: props.params.rentalGroupId })} />
        <h2 className='text-xl font-bold'>Agregar registro</h2>
      </section>
      <section className='flex flex-wrap gap-4'>
        <SelectYear />
        <SelectMonth />
      </section>
      <CalculateProvider>
        <section className='flex gap-14 max-md:flex-col lg:gap-x-16'>
          <form className='flex gap-12 max-lg:flex-col'>
            <BillInfo />
            <ParticipantsInfo />
          </form>
          <Results />
        </section>
        <SaveButton />
      </CalculateProvider>
    </>
  )
}
