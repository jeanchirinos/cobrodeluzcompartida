import { Input } from '@/components/Input'

export function BillInfo() {
  return (
    <section className='space-y-8'>
      <h3 className='text-large font-semibold'>Datos del recibo</h3>
      <div className='flex flex-col gap-y-6'>
        <Input name='consumption' label='Consumo kWh' placeholder='0.00' type='number' />
        <Input
          name='kwh'
          label='kWh al precio de'
          placeholder='0.00'
          startContent='S/.'
          type='number'
        />
        <Input
          name='totalMonth'
          label='TOTAL mes actual'
          placeholder='0.00'
          startContent='S/.'
          type='number'
        />
        <Input
          name='totalAmount'
          label='Total a pagar'
          placeholder='0.00'
          startContent='S/.'
          type='number'
        />
      </div>
    </section>
  )
}
