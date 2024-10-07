'use client'

import { BillOptions } from './BillOptions'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@nextui-org/react'
import { CalculateResults } from '@/controllers/RentalGroupRegisterController/calculateResults/calculateResults.schema'

export function BillInfo() {
  const { control } = useFormContext<CalculateResults>()

  return (
    <section className='flex flex-col gap-y-8'>
      <div className='flex gap-x-2'>
        <h3 className='text-large font-semibold'>Datos del recibo</h3>
        <BillOptions />
      </div>
      <div className='flex flex-col gap-y-6'>
        <Controller
          name='billData.consumption_kwh'
          control={control}
          render={({ field, fieldState, formState }) => (
            <Input
              type='number'
              label='Consumo kWh'
              endContent='kWh'
              placeholder='0'
              {...field}
              value={field.value?.toString() ?? ''}
              onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              isDisabled={formState.isSubmitting}
              labelPlacement='outside'
            />
          )}
        />

        <Controller
          name='billData.kwh_price'
          control={control}
          render={({ field, fieldState, formState }) => (
            <Input
              type='number'
              label='kWh al precio de'
              startContent='S/.'
              placeholder='0.0000'
              step={0.0001}
              {...field}
              value={field.value?.toString() ?? ''}
              onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              isDisabled={formState.isSubmitting}
              labelPlacement='outside'
            />
          )}
        />

        <Controller
          name='billData.current_month_total'
          control={control}
          render={({ field, fieldState, formState }) => (
            <Input
              type='number'
              label='TOTAL mes actual'
              startContent='S/.'
              placeholder='0.00'
              step={0.01}
              {...field}
              value={field.value?.toString() ?? ''}
              onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              isDisabled={formState.isSubmitting}
              labelPlacement='outside'
            />
          )}
        />

        <Controller
          name='billData.total'
          control={control}
          render={({ field, fieldState, formState }) => (
            <Input
              type='number'
              label='Total a pagar'
              endContent='kWh'
              startContent='S/.'
              placeholder='0.00'
              step={0.01}
              {...field}
              value={field.value?.toString() ?? ''}
              onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              isDisabled={formState.isSubmitting}
              labelPlacement='outside'
            />
          )}
        />
      </div>
    </section>
  )
}
