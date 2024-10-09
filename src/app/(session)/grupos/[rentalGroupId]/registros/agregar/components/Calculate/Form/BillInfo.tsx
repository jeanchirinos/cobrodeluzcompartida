'use client'

import { useCalculateContext } from '../../../context/CalculateContext'

export function BillInfo() {
  const { useFormHook } = useCalculateContext()

  return (
    <section className='flex flex-col gap-y-8'>
      <div className='flex gap-x-2'>
        <h3 className='text-large font-semibold'>Datos del recibo</h3>
      </div>
      <div className='flex flex-col gap-y-6'>
        {/* <CustomInput
          useFormHook={useFormHook}
          name='billData.consumption_kwh'
          label='Consumo kWh'
          placeholder='0'
          type='number'
          endContent='kWh'
        />
        <CustomInput
          useFormHook={useFormHook}
          name='billData.kwh_price'
          label='kWh al precio de'
          placeholder='0.0000'
          startContent='S/.'
          type='number'
          step={0.0001}
        />
        <CustomInput
          useFormHook={useFormHook}
          name='billData.current_month_total'
          label='TOTAL mes actual'
          placeholder='0.00'
          startContent='S/.'
          type='number'
          step={0.01}
        />
        <CustomInput
          useFormHook={useFormHook}
          name='billData.total'
          label='Total a pagar'
          placeholder='0.00'
          startContent='S/.'
          type='number'
          step={0.01}
        /> */}
      </div>
    </section>
  )
}
