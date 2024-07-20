import { ButtonBack } from '@/components/Button/ButtonBack'
import { ROUTE } from '@/constants/routes'
import { PagePropsParams } from '@/types'
import { Button } from '@nextui-org/react'
import { SelectMonth, SelectYear } from './components/Selects'

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
      <p>Esta es la página de crear registro</p>
      <Button color='primary' className='w-fit'>
        Guardar registro
      </Button>
    </>
  )
}
