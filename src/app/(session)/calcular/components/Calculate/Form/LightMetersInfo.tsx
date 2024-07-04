'use client'

import { IconAdd, IconDelete } from '@/icons'
import { Button } from '@nextui-org/button'
import { useCalculateContext } from '../../../context/CalculateContext'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { useFieldArray } from 'react-hook-form'

export function LightMetersInfo() {
  const { useFormHook } = useCalculateContext()
  const { control, trigger } = useFormHook

  const { fields, append, remove } = useFieldArray({
    name: 'consumptions',
    control,
  })

  return (
    <section className='flex flex-col gap-y-8'>
      <h3 className='text-large font-semibold'>Datos de los medidores</h3>
      <div className='space-y-6'>
        <div className='flex flex-col gap-y-6'>
          {fields.map((field, i) => (
            <CustomInput
              useFormHook={useFormHook}
              key={field.id}
              name={`consumptions.${i}.consumption_kwh`}
              type='number'
              endContent='kWh'
              label={
                <div className='flex h-8 items-center space-x-3'>
                  <span>{field.alias}</span>
                  {fields.length > 1 && (
                    <Button
                      type='button'
                      onPress={async () => {
                        remove(i)
                        await trigger(`consumptions.${i}.consumption_kwh`)
                      }}
                      isIconOnly
                      size='sm'
                      aria-label='Remover consumo'
                      title='Remover consumo'
                      variant='light'
                      color='danger'
                    >
                      <IconDelete />
                    </Button>
                  )}
                </div>
              }
              placeholder='0.00'
              step={0.01}
            />
          ))}
        </div>
        <Button
          type='button'
          color='primary'
          variant='flat'
          fullWidth
          endContent={<IconAdd />}
          onClick={() =>
            append({ consumption_kwh: undefined as unknown as number, alias: `Consumo ${fields.length + 1}` })
          }
        >
          Agregar consumo
        </Button>
      </div>
    </section>
  )
}
