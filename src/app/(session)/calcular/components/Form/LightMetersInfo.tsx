import { IconAdd } from '@/app/icons'
import { Input } from '@/components/Input'
import { Button } from '@nextui-org/button'

export function LightMetersInfo() {
  return (
    <section className='space-y-unit-xl'>
      <h3 className='text-large font-semibold'>Datos de los medidores (kWh)</h3>
      <div className='space-y-unit-lg'>
        <div className='flex flex-col gap-y-unit-lg'>
          <Input name='consumption1' label='Consumo 1' placeholder='0.00' />
        </div>
        <Button color='primary' variant='flat' fullWidth startContent={<IconAdd />}>
          Agregar consumo
        </Button>
      </div>
    </section>
  )
}
