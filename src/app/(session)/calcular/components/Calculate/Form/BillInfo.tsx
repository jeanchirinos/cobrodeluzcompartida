import { Input } from '@/components/Input'

export function BillInfo() {
  return (
    <section className='space-y-8'>
      <h3 className='text-large font-semibold'>Datos del recibo</h3>
      <div className='flex flex-col gap-y-6'>
        {/* Temporaly hidden inputs */}
        <input type='hidden' name='year' defaultValue='2024' />
        <input type='hidden' name='month' defaultValue='1' />
        <input type='hidden' name='igv' defaultValue='0.18' />

        <Input
          name='consumption_kwh'
          label='Consumo kWh'
          placeholder='0'
          type='number'
          endContent='kWh'
        />
        <Input
          name='kwh_price'
          label='kWh al precio de'
          placeholder='0.0000'
          startContent='S/.'
          type='number'
          step={0.0001}
        />
        <Input
          name='current_month_total'
          label='TOTAL mes actual'
          placeholder='0.00'
          startContent='S/.'
          type='number'
          step={0.01}
        />
        <Input
          name='total'
          label='Total a pagar'
          placeholder='0.00'
          startContent='S/.'
          type='number'
          step={0.01}
        />
      </div>
    </section>
  )
}
