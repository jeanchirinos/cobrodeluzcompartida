import { ButtonBack } from '@/components/Button/ButtonBack'
import { ROUTE } from '@/constants/routes'
import { PagePropsParams } from '@/types'
import { Calculate } from './components/Calculate'
import { CalculateFormProvider } from './context/CalculateFormProvider'

export default async function Page(props: PagePropsParams<'rentalGroupId'>) {
  return (
    <>
      <section className='flex items-center gap-x-2'>
        <ButtonBack href={ROUTE.GROUPS.REGISTERS.INDEX({ rentalGroupId: (await props.params).rentalGroupId })} />
        <h2 className='text-xl font-bold'>Agregar registro</h2>
      </section>
      <CalculateFormProvider>
        <Calculate />
      </CalculateFormProvider>
    </>
  )
}
