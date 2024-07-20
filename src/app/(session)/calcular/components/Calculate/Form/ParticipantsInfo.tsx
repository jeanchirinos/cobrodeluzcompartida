'use client'

import { IconAdd, IconDelete } from '@/icons'
import { Button } from '@nextui-org/button'
import { useCalculateContext } from '../../../context/CalculateContext'
import { CustomInput } from '@/components/ReactForm/withHookForm'
import { useFieldArray } from 'react-hook-form'

export function ParticipantsInfo() {
  const { useFormHook } = useCalculateContext()
  const { control, watch, trigger } = useFormHook

  const { fields, append, replace } = useFieldArray({
    name: 'consumptions',
    control,
  })

  const watchFieldArray = watch('consumptions')
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    }
  })

  return (
    <section className='flex flex-col gap-y-8'>
      <h3 className='text-large font-semibold'>Datos de los medidores</h3>
      <div className='space-y-6'>
        <div className='flex flex-col gap-y-6'>
          {controlledFields.map((field, i) => (
            <CustomInput
              useFormHook={useFormHook}
              key={field.id}
              name={`consumptions.${i}.consumption_kwh`}
              registerOptions={{ valueAsNumber: true }}
              type='number'
              endContent='kWh'
              label={
                <div className='flex h-8 items-center space-x-3'>
                  <span>{field.alias}</span>
                  {fields.length > 1 && (
                    <Button
                      onPress={async () => {
                        const newFields = controlledFields
                          .filter(controlledField => controlledField.id !== field.id)
                          .map((field, index) => ({ ...field, alias: `Consumo ${index + 1}` }))

                        replace(newFields)

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
